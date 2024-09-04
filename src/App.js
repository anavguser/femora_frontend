import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FileUpload from './components/FileUpload';
import DataDisplay from './components/DataDisplay';

const theme = createTheme();

export default function App() {
  const [processedData, setProcessedData] = useState(null);

  const handleDataProcessed = (data) => {
    setProcessedData(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            CSV Processor
          </Typography>
          <FileUpload onDataProcessed={handleDataProcessed} />
          {processedData && <DataDisplay data={processedData} />}
        </Box>
      </Container>
    </ThemeProvider>
  );
}