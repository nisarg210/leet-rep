import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { loadFromLocalStorage } from '../utils/localStorageUtils';

const TodaysListPage = () => {
  const [problems, setProblems] = useState(() => loadFromLocalStorage('problems'));
  const [todaysList, setTodaysList] = useState([]);

  useEffect(() => {
    const now = Date.now(); // Current timestamp
    const todayDate = new Date().toDateString(); // Today's date string
  
    const dueProblems = problems.map((problem) => {
      const intervalMs = problem.interval * 24 * 60 * 60 * 1000; // Convert interval to milliseconds
      const nextReviewTime = problem.lastReviewed + intervalMs; // Calculate next review time
      const lastReviewedDate = new Date(problem.lastReviewed).toDateString(); // Last reviewed date string
  
      // Check if the problem needs review today or was reviewed today
      if (!problem.lastReviewed || now >= nextReviewTime || lastReviewedDate === todayDate) {
        return {
          ...problem,
          status: lastReviewedDate === todayDate ? "Done" : problem.status, // Update status if reviewed today
        };
      }
      return null; // Exclude problems not due for review
    }).filter(Boolean); // Remove null entries
  
    setTodaysList(dueProblems); // Update state with today's list
  }, [problems]);
  

  return (
    <TableContainer>
      <h2>Today's List</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todaysList.map((problem) => (
            <TableRow key={problem.id}>
              <TableCell>{problem.id}</TableCell>
              <TableCell>
                {/* Navigate to ProblemDetailsPage */}
                <Link to={`/problem/${problem.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                  {problem.title}
                </Link>
              </TableCell>
              <TableCell>{problem.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodaysListPage;
