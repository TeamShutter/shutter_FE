import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Link from 'next/link';
import { getCookie } from './cookie';
import { useEffect, useState } from 'react';



// const settings = [
//     {
//         title: 'Profile',
//         link: '/profile',
//     },
//     {
//         title: 'Logout',
//         link: '/logout',
//     }
// ];
// const settings = ['Profile', 'Logout'];

const Header = () => {
  const [user, setUser] = useState(getCookie("user"));
  useEffect(() => {
    setUser(getCookie("user"));
  }, []);


  const pages = [
    {
        title: 'photos',
        link: '/',
    },
    {
        title: 'studios',
        link: '/studios',
    }
];

const settings = user ? [
  {
      title: 'Profile',
      link: '/profile',
  },
  {
    title: 'Log out',
    link: '/logout',
},
] : [
  {
      title: 'Login',
      link: '/login',
  },
  {
    title: 'Sign Up',
    link: '/signup',
},
]

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ mb: 8 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PhotoCameraIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link href="/">
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
            cursor: 'pointer',
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'helvetica',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
              Shutter
          </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <PhotoCameraIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Link href="/">
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
            cursor: 'pointer',
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SHUTTER
          </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
              key={page.title}
              href={page.link}
              >
              <a>
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page.title}
                </Button>
              </a>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user ? user.username : ""} src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                    <Link href={setting.link}>
                        <a>
                            <Typography textAlign="center">{setting.title}</Typography>
                        </a>
                    </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
