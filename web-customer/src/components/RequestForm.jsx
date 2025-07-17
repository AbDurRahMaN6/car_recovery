import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from '../api/axios';

const RequestForm = () => {
  const [form, setForm] = useState({ customer_name: '', location: '', note: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    try {
      await axios.post('/requests', form);
      setSuccess(true);
      setForm({ customer_name: '', location: '', note: '' });
    } catch (err) {
      setError('Failed to submit request.');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Request Towing Service
      </Typography>

      {success && <Alert severity="success">Request submitted successfully!</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Customer Name"
          name="customer_name"
          value={form.customer_name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Note"
          name="note"
          value={form.note}
          onChange={handleChange}
          multiline
          rows={3}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit Request
        </Button>
      </form>
    </Box>
  );
};

export default RequestForm;
