import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{
        py: 4,
        background: 'linear-gradient(180deg, rgba(20, 20, 40, 0.95) 0%, rgba(15, 15, 30, 0.95) 100%)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #7C4DFF 30%, #FF4081 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            mb: 2
          }}
        >
          PEO.AI
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Optimize your AI prompts for more effective interactions.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          © {currentYear} PEO.AI. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;