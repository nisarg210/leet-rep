import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

const ProblemDetailsPage = () => {
  const { id } = useParams(); // Get problem ID from route params
  const navigate = useNavigate(); // For navigation after feedback

  const problems = loadFromLocalStorage('problems');
  const problem = problems.find((p) => p.id === parseInt(id));

  const [feedbackGiven, setFeedbackGiven] = useState(false);

  if (!problem) {
    return <h2>Problem not found</h2>;
  }

  const handleFeedback = (feedback) => {
    // Update interval based on feedback
    const updatedProblems = problems.map((p) =>
      p.id === problem.id
        ? {
            ...p,
            interval: calculateNextInterval(p.interval, feedback),
            lastReviewed: Date.now(),
          }
        : p
    );

    saveToLocalStorage('problems', updatedProblems);
    setFeedbackGiven(true);

    // Navigate back to Today's List after giving feedback
    setTimeout(() => navigate('/todays-list'), 2000);
  };

  const calculateNextInterval = (currentInterval, feedback) => {
    switch (feedback) {
      case 'Again':
        return Math.max(1, currentInterval / 2); // Reduce interval significantly
      case 'Hard':
        return currentInterval * 1.2; // Slight increase
      case 'Good':
        return currentInterval * 2; // Double interval
      case 'Easy':
        return currentInterval * 1.5; // Aggressive increase
      default:
        return currentInterval;
    }
  };

  return (
    <Box sx={{ mx: 'auto', mt: 4 }}>
      <h2>{problem.title}</h2>

      {/* Display iframe if link exists */}
      {problem.link ? (
        <iframe
          src={problem.link}
          title={problem.title}
          style={{ width: '100%', height: '60vh', border: 'none' }}
        ></iframe>
      ) : (
        <p>No link available for this problem.</p>
      )}
      <h2>Note</h2>
    {
        problem.notes && <Typography>{problem.notes}</Typography>
    }
      {/* Feedback Buttons */}
      {!feedbackGiven ? (
        <Box sx={{ mt: 3 }}>
          <Button variant="outlined" color="error" onClick={() => handleFeedback('Again')} sx={{ mr: 2 }}>
            Again
          </Button>
          <Button variant="outlined" color="warning" onClick={() => handleFeedback('Hard')} sx={{ mr: 2 }}>
            Hard
          </Button>
          <Button variant="outlined" color="primary" onClick={() => handleFeedback('Good')} sx={{ mr: 2 }}>
            Good
          </Button>
          <Button variant="outlined" color="success" onClick={() => handleFeedback('Easy')}>
            Easy
          </Button>
        </Box>
      ) : (
        <p>Feedback submitted! Redirecting...</p>
      )}
    </Box>
  );
};

export default ProblemDetailsPage;
