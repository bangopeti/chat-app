import React from 'react';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';

const Layout = ({ children }) => {
  return (
    <Container maxWidth='sm'>
      <Paper>
        <Box p={3}>
          <main>{children}</main>
        </Box>
      </Paper>
    </Container>
  );
};

export default Layout;
