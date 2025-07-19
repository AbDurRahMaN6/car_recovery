import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/login', values);
        localStorage.setItem('token', res.data.token);
        setSuccess('Login successful!');
        setError('');
        setTimeout(() => navigate('/'), 1000);
      } catch (err) {
        setError('Invalid credentials.');
        setSuccess('');
      }
    },
  });

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid item size={8} xs={4}
        md={4}>
        <Box
          component="img"
          src="https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387_1280.png"
          alt="Login car"
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Grid>

      <Grid
        item size={4}
        xs={4}
        md={4}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          backgroundColor: '#fff',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Sign In to your account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter your details to proceed further
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
              sx={{ mt: 1 }}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Sign in
            </Button>
          </form>

          <Typography mt={3} textAlign="center">
            Don’t have an account? <Link to="/register">Register</Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginForm;

