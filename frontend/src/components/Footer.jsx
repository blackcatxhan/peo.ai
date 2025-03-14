import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ 
      py: 3, 
      textAlign: 'center', 
      bgcolor: 'background.default',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
      mt: 2 
    }}>
      <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8, fontWeight: 500 }}>
        PEO.AI - Prompt Engineering Optimizer © {new Date().getFullYear()}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, opacity: 0.6 }}>
        Optimize your prompts for better AI interactions
      </Typography>
    </Box>
  );
};

export default Footer;