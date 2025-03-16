import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { loadFromLocalStorage } from "../utils/localStorageUtils";

const ProblemListPage = () => {
  const problems = loadFromLocalStorage("problems");

  return (
    <TableContainer>
      <h2>All Problems</h2>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableCell>Title</TableCell>
            <TableCell>Link</TableCell>
            {/* <TableCell>Notes</TableCell>
            <TableCell>Problem Text</TableCell> */}
            <TableCell>Interval (days)</TableCell>
            <TableCell>Last Reviewed</TableCell>
            {/* <TableCell>Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {problems.map((problem) => (
            <TableRow key={problem.id}>
              {/* <TableCell>{problem.id}</TableCell> */}
              <TableCell>{problem.title}</TableCell>
              <TableCell>
                {problem.link ? (
                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                ) : (
                  "N/A"
                )}
              </TableCell>
              {/* <TableCell>{problem.notes || "N/A"}</TableCell>
              <TableCell>{problem.text}</TableCell> */}
              <TableCell>{Math.round(problem.interval)}</TableCell>
              <TableCell>
                {problem.lastReviewed
                  ? new Date(problem.lastReviewed).toLocaleDateString()
                  : "Never"}
              </TableCell>
              {/* <TableCell>{problem.status || "Pending"}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProblemListPage;
