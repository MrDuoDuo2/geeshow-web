import React from 'react';
import { useRoutes } from 'react-router';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import routes from './routes';
import theme from './theme';
import './Global.css';


const App = () => {
  const content = useRoutes(routes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* <GlobalStyles /> */}
        {content}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
