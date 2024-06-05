import React from 'react';
import { Box, Typography } from '@mui/material';
import "./header.css";

export default function Header() {
  return (
    <Box className="header" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h2" component="div" className="headerTitleLg">
        BLOGGERLINE
      </Typography>
      <Typography variant="h6" component="div" className="headerTitleSm">
        your online blogging community
      </Typography>
    </Box>
  );
}