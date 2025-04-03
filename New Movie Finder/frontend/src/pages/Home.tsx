import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 600,
            width: '100%',
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Media Finder
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Your one-stop destination for finding and downloading movies, TV series, and music.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            onClick={() => navigate('/search')}
            sx={{ mt: 2 }}
          >
            Start Searching
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home; 