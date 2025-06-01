import * as React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

export default function TopBar() {
    return (
          <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        E Commerce
                    </Typography>

        
                </Toolbar>
            </Container>
        </AppBar>
    );
}