import React, { useState } from 'react';
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import FunctionPlot from './components/FunctionPlot';
import Derivatives from './components/Derivatives';
import Integrals from './components/Integrals';
import HigherDerivatives from './components/HigherDerivatives';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <FunctionPlot />;
      case 1:
        return <Derivatives />;
      case 2:
        return <Integrals />;
      case 3:
        return <HigherDerivatives />;
      default:
        return <FunctionPlot />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Navbar />
        <Sidebar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            ml: { sm: '240px' },
            mt: '64px',
          }}
        >
          <Container maxWidth="xl">
            {renderContent()}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App; 