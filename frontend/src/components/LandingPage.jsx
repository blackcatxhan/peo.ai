import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, useTheme, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeIcon from '@mui/icons-material/Code';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SpeedIcon from '@mui/icons-material/Speed';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { Footer } from './';

const FeatureCard = ({ icon, title, description }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
        },
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, rgba(30, 30, 60, 0.9) 100%)`,
        border: '1px solid rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Box
        sx={{
          mb: 2,
          p: 2,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #7C4DFF 30%, #FF4081 90%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(108, 99, 255, 0.3)',
        }}
      >
        {icon}
      </Box>
      <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
        {description}
      </Typography>
    </Paper>
  );
};

const LandingPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" elevation={0} sx={{
        background: 'linear-gradient(180deg, rgba(20, 20, 40, 0.95) 0%, rgba(15, 15, 30, 0.95) 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <Toolbar sx={{ py: 1.5 }}>
          <Typography variant="h5" component="div" sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #7C4DFF 30%, #FF4081 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}>
            PEO.AI
          </Typography>
          <Button 
            color="inherit" 
            component={Link}
            to="/chat"
            sx={{ 
              ml: 2,
              borderRadius: 2,
              px: 2,
              py: 0.75,
              bgcolor: 'rgba(108, 99, 255, 0.15)',
              '&:hover': {
                bgcolor: 'rgba(108, 99, 255, 0.3)',
              }
            }}
          >
            Go to Chat
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 10, md: 15 },
          pb: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(25, 25, 50, 0.95) 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 150%, rgba(124, 77, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 64, 129, 0.15) 0%, transparent 50%)',
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ animation: 'fadeInUp 1s ease-out', '@keyframes fadeInUp': {
                '0%': { opacity: 0, transform: 'translateY(40px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              }}}>
                <Typography 
                  variant="h1" 
                  component="h1" 
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    background: 'linear-gradient(45deg, #7C4DFF 30%, #FF4081 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    mb: 2,
                  }}
                >
                  Optimize Your AI Prompts
                </Typography>
                <Typography 
                  variant="h5" 
                  component="p" 
                  sx={{ 
                    mb: 4, 
                    color: 'text.secondary',
                    maxWidth: '600px',
                    lineHeight: 1.6,
                  }}
                >
                  PEO.AI helps you craft better prompts for more effective AI interactions. Enhance your results with our advanced prompt engineering optimizer.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: '28px',
                      fontWeight: 600,
                      fontSize: '1rem',
                      background: 'linear-gradient(45deg, #7C4DFF 30%, #9D6FFF 90%)',
                      boxShadow: '0 8px 20px rgba(124, 77, 255, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-3px) scale(1.02)',
                        boxShadow: '0 12px 25px rgba(124, 77, 255, 0.4)',
                      },
                    }}
                    component={Link}
                    to="/chat"
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: '28px',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderColor: 'rgba(124, 77, 255, 0.5)',
                      color: '#B47CFF',
                      '&:hover': {
                        borderColor: '#7C4DFF',
                        background: 'rgba(124, 77, 255, 0.08)',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ 
                position: 'relative',
                animation: 'float 6s ease-in-out infinite',
                '@keyframes float': {
                  '0%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-20px)' },
                  '100%': { transform: 'translateY(0px)' },
                },
              }}>
                <svg width="100%" height="100%" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C4DFF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FF4081" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#141428" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#1E1E2E" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  
                  {/* Background shape */}
                  <rect x="50" y="50" width="400" height="300" rx="20" fill="url(#grad2)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  
                  {/* Decorative elements */}
                  <circle cx="120" cy="100" r="15" fill="url(#grad1)" />
                  <circle cx="380" cy="300" r="25" fill="url(#grad1)" opacity="0.6" />
                  
                  {/* Prompt lines */}
                  <rect x="100" y="150" width="300" height="20" rx="10" fill="rgba(255,255,255,0.1)" />
                  <rect x="100" y="190" width="250" height="20" rx="10" fill="rgba(255,255,255,0.1)" />
                  <rect x="100" y="230" width="200" height="20" rx="10" fill="rgba(255,255,255,0.1)" />
                  
                  {/* Optimization indicator */}
                  <path d="M100,270 L400,270" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M100,270 Q250,200 400,270" stroke="#7C4DFF" strokeWidth="3" fill="none" />
                  <circle cx="250" cy="235" r="8" fill="#FF4081" />
                </svg>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom
              sx={{
                fontWeight: 700,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(45deg, #7C4DFF 30%, #FF4081 90%)',
                  borderRadius: '2px',
                },
              }}
            >
              Why Choose PEO.AI?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto', mt: 3 }}>
              Our platform offers powerful tools to enhance your AI interactions through optimized prompts
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<AutoFixHighIcon sx={{ fontSize: 40, color: 'white' }} />}
                title="Smart Optimization"
                description="Automatically enhance your prompts with our AI-powered optimization engine"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<SpeedIcon sx={{ fontSize: 40, color: 'white' }} />}
                title="Faster Results"
                description="Get better AI responses in less time with precisely crafted prompts"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<CodeIcon sx={{ fontSize: 40, color: 'white' }} />}
                title="Code Generation"
                description="Optimize prompts specifically for code generation and technical tasks"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<PsychologyIcon sx={{ fontSize: 40, color: 'white' }} />}
                title="Learning System"
                description="Our system learns from your interactions to provide increasingly better suggestions"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section with Gradient Background */}
      <Box sx={{ 
        py: { xs: 8, md: 12 }, 
        background: 'linear-gradient(135deg, rgba(20, 20, 40, 0.95) 0%, rgba(30, 30, 60, 0.95) 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(124, 77, 255, 0.15) 0%, transparent 50%)',
          zIndex: 0,
        },
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                position: 'relative',
                p: 2,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: '2px solid',
                  borderImage: 'linear-gradient(45deg, #7C4DFF 30%, #FF4081 90%) 1',
                  borderRadius: '16px',
                  zIndex: -1,
                },
              }}>
                <svg width="100%" height="100%" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="benefitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C4DFF" />
                      <stop offset="100%" stopColor="#00C853" />
                    </linearGradient>
                  </defs>
                  
                  {/* Background shape */}
                  <rect x="50" y="50" width="400" height="300" rx="20" fill="url(#grad2)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  
                  {/* Decorative elements */}
                  <circle cx="120" cy="100" r="15" fill="url(#grad1)" />
                  <circle cx="380" cy="300" r="25" fill="url(#grad1)" opacity="0.6" />
                  
                  {/* Prompt lines */}
                  <rect x="100" y="150" width="300" height="20" rx="10" fill="rgba(255,255,255,0.1)" />
                  <rect x="100" y="190" width="250" height="20" rx="10" fill="rgba(255,255,255,0.1)" />
                  <rect x="100" y="230" width="200" height="20" rx="10" fill="rgba(255,255,255,0.1)" />
                  
                  {/* Optimization indicator */}
                  <path d="M100,270 L400,270" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M100,270 Q250,200 400,270" stroke="#7C4DFF" strokeWidth="3" fill="none" />
                  <circle cx="250" cy="235" r="8" fill="#FF4081" />
                </svg>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                animation: 'fadeInRight 1s ease-out', 
                '@keyframes fadeInRight': {
                  '0%': { opacity: 0, transform: 'translateX(40px)' },
                  '100%': { opacity: 1, transform: 'translateX(0)' },
                }
              }}>
                <Typography 
                  variant="h3" 
                  component="h3" 
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    background: 'linear-gradient(45deg, #7C4DFF 30%, #00C853 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 3,
                  }}
                >
                  Transform Your AI Interactions
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  {[
                    {
                      title: 'Increased Accuracy',
                      description: 'Get more precise and relevant responses from AI models with optimized prompts.'
                    },
                    {
                      title: 'Time Efficiency',
                      description: 'Reduce the time spent refining prompts and get to your desired output faster.'
                    },
                    {
                      title: 'Cost Optimization',
                      description: 'Minimize token usage and API costs with more efficient prompt structures.'
                    }
                  ].map((benefit, index) => (
                    <Box key={index} sx={{ mb: 2.5, display: 'flex', alignItems: 'flex-start' }}>
                      <Box 
                        sx={{ 
                          minWidth: '36px', 
                          height: '36px', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          background: 'linear-gradient(45deg, #7C4DFF 30%, #00C853 90%)',
                          mr: 2,
                          boxShadow: '0 4px 10px rgba(124, 77, 255, 0.3)',
                        }}
                      >
                        <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>{index + 1}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 0.5 }}>
                          {benefit.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {benefit.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                
                <Button 
                  variant="contained" 
                  size="large" 
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '28px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    background: 'linear-gradient(45deg, #7C4DFF 30%, #00C853 90%)',
                    boxShadow: '0 8px 20px rgba(124, 77, 255, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-3px) scale(1.02)',
                      boxShadow: '0 12px 25px rgba(124, 77, 255, 0.4)',
                    },
                  }}
                  href="/app"
                >
                  Try It Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingPage;