import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

const AddProblemFormPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    notes: '',
    text: '',
  });

  const [problems, setProblems] = useState(() => loadFromLocalStorage('problems'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.text.trim()) {
      const newProblem = {
        id: problems.length + 1,
        ...formData,
        interval: 1,
        lastReviewed: null,
        status: 'Pending',
      };

      const updatedProblems = [...problems, newProblem];
      setProblems(updatedProblems);
      saveToLocalStorage('problems', updatedProblems);
      setFormData({ title: '', link: '', notes: '', text: '' }); // Reset form
    }
  };

  return (
    <Box sx={{ maxWidth: '500px', mx: 'auto' }}>
      <h2>Add Problem</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Problem Text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Problem
        </Button>
      </form>
    </Box>
  );
};

export default AddProblemFormPage;
