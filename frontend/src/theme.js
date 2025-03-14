import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6C63FF', // Modern purple/indigo
      light: '#9D97FF',
      dark: '#4B44CC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF6584', // Vibrant coral/pink
      light: '#FF8FA3',
      dark: '#D14D69',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#121212',
      paper: '#1E1E2E', // Slightly blueish dark background for cards
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0C0', // Slightly blueish gray for secondary text
    },
    error: {
      main: '#FF5252',
    },
    warning: {
      main: '#FFB74D',
    },
    info: {
      main: '#64B5F6',
    },
    success: {
      main: '#66BB6A',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.02857em',
      textTransform: 'none', // Avoid all-caps buttons for a more modern look
    },
  },
  shape: {
    borderRadius: 12, // More rounded corners for a modern look
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
          backgroundColor: 'transparent',
        },
        '*::-webkit-scrollbar-track': {
          background: 'transparent',
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          transition: 'background 0.2s ease-in-out',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(255, 255, 255, 0.2)',
        },
        '*::-webkit-scrollbar-corner': {
          background: 'transparent',
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #6C63FF 30%, #7E76FF 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #FF6584 30%, #FF7A97 90%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
        },
        elevation3: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.2s ease-in-out',
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(108, 99, 255, 0.2)',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(30, 30, 46, 0.8)', // Semi-transparent app bar
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: '0.5rem 1rem',
        },
      },
    },
  },
});