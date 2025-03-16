import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import AddProblemFormPage from './components/AddProblemFormPage';
import TodaysListPage from './components/TodaysListPage';
import ProblemListPage from './components/ProblemListPage';
import theme from './theme';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';         // Core CSS
import 'primeicons/primeicons.css';                      // Icons
import ProblemDetailsPage from './components/ProblemDetailsPage';


const App = () => {
  const handleReset = () => {
    localStorage.clear(); // Clear local storage
    alert('All data has been reset!');
    window.location.reload(); // Reload the app to reset state
  };
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Spaced Repetition App
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Add Problem
            </Button>
            <Button color="inherit" component={Link} to="/todays-list">
              Today's List
            </Button>
            <Button color="inherit" component={Link} to="/problem-list">
              All Problems
            </Button>
            <Button color="inherit" onClick={handleReset}>
            Reset
          </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<AddProblemFormPage />} />
            <Route path="/todays-list" element={<TodaysListPage />} />
            <Route path="/problem-list" element={<ProblemListPage />} />
            <Route path="/problem/:id" element={<ProblemDetailsPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
