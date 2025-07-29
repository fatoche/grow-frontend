import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem, 
  Box,
  useTheme
} from '@mui/material';
import { Link, useLocation } from 'react-router';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const location = useLocation();
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ minHeight: '64px', px: 2 }}>
        {/* Left: Grow Icon */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box
            component="img"
            src="/favicon.png"
            alt="GROW"
            sx={{
              width: 32,
              height: 32,
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
        </Link>

        {/* Center: GROW Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            fontWeight: 600,
            color: theme.palette.primary.main,
            fontSize: '1.25rem',
            letterSpacing: '0.5px',
          }}
        >
          GROW
        </Typography>

        {/* Right: Hamburger Menu */}
        <IconButton
          size="large"
          edge="end"
          color="primary"
          aria-label="menu"
          aria-controls={isMenuOpen ? 'header-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? 'true' : undefined}
          onClick={handleMenuOpen}
          sx={{
            color: theme.palette.primary.main,
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Menu */}
        <Menu
          id="header-menu"
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'header-menu-button',
          }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              borderRadius: 2,
            }
          }}
        >
          <MenuItem 
            component={Link} 
            to="/garden" 
            onClick={handleMenuClose}
            selected={location.pathname === '/garden'}
            sx={{
              color: theme.palette.text.primary,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                },
              },
            }}
          >
            Garten anlegen
          </MenuItem>
          <MenuItem 
            component={Link} 
            to="/plant-families" 
            onClick={handleMenuClose}
            selected={location.pathname === '/plant-families'}
            sx={{
              color: theme.palette.text.primary,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                },
              },
            }}
          >
            Pflanzen verwalten
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 