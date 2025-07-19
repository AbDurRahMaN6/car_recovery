import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';


const RegistrationForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('/register', values);
        navigate('/login');
      } catch (err) {
        setError('Registration failed.');
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
      <Grid item size={4}
        xs={4}
        md={4}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          backgroundColor: '#fff',
        }}>
        <Box sx={{ maxWidth: 400, width: '100%' }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Create your account
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
              Register
            </Button>
          </form>

          <Typography mt={3} textAlign="center">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>

      </Grid>
    </Grid>


  );
};

export default RegistrationForm;
