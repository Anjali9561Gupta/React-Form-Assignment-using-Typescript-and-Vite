//Import MUI library and modules
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const FormPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && phone && email) {
      localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
      navigate('/second');
    }
  };

  return (
    <Container>

      <Typography variant="h4" gutterBottom>Enter your details</Typography>
      <TextField 
      label="Name" 
      value={name} 
      onChange={(e) => 
      setName(e.target.value)} 
      fullWidth margin="normal" 
      />
      <TextField 
      label="Phone Number" 
      value={phone} 
      onChange={(e) => 
      setPhone(e.target.value)} 
      fullWidth margin="normal" 
      />
      <TextField 
      label="Email" 
      value={email} 
      onChange={(e) => 
      setEmail(e.target.value)} 
      fullWidth margin="normal" 
      />
      <Button 
      variant="contained" 
      color="primary" 
      onClick={handleSubmit}>
        Submit
      </Button>
      
    </Container>
  );
};

export default FormPage;