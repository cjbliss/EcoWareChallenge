import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#e4efff',
            paper: '#ffffff'
        },
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: 'Catamaran, Arial, sans-serif', // Fallback to Arial if Dosis isn't loaded
    },
});

export default theme;