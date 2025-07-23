import React, { useState, useCallback } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Container,
  useMediaQuery
} from '@mui/material';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const containerStyle = {
  width: '100%',
  height: '300px',
  marginTop: '1rem',
  marginBottom: '1rem',
};

const centerDefault = {
  lat: 25.276987,
  lng: 55.296249,
};

const RequestForm = ({ setLoggedIn }) => {
  const [form, setForm] = useState({
    customer_name: '',
    location: '',
    note: '',
    latitude: null,
    longitude: null,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMapClick = useCallback((event) => {
    setForm((prev) => ({
      ...prev,
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng(),
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    if (form.latitude === null || form.longitude === null) {
      setError('Please select a location on the map.');
      return;
    }

    try {
      await axios.post('/requests', form);
      setSuccess(true);
      setForm({
        customer_name: '',
        location: '',
        note: '',
        latitude: null,
        longitude: null,
      });
    } catch (err) {
      setError('Failed to submit request.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFDA43',
      padding: 2,
    }}
  >
    <Box
      sx={{
        width: { xs: '100%', sm: '90%', md: '750px' }, // Wider and responsive
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
        p: { xs: 2, sm: 4 },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Request Towing Service
      </Typography>

      {success && <Alert severity="success">Request submitted successfully!</Alert>}
      {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}

      <form onSubmit={handleSubmit} noValidate>
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
          label="Location Description"
          name="location"
          value={form.location}
          onChange={handleChange}
          margin="normal"
        />

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            form.latitude && form.longitude
              ? { lat: form.latitude, lng: form.longitude }
              : centerDefault
          }
          zoom={12}
          onClick={handleMapClick}
        >
          {form.latitude && form.longitude && (
            <Marker position={{ lat: form.latitude, lng: form.longitude }} />
          )}
        </GoogleMap>

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

        <Typography variant="body2" color="textSecondary" mt={1}>
          {form.latitude && form.longitude
            ? `Selected Location: (${form.latitude.toFixed(6)}, ${form.longitude.toFixed(6)})`
            : 'Click on the map to select your location.'}
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Submit Request
        </Button>
      </form>
    </Box>
  </Box>
);

};

export default RequestForm;
