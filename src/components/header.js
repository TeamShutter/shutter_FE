import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

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
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const pages = [
    {
      title: "사진",
      link: "/home",
    },
    {
      title: "스튜디오",
      link: "/studios",
    },
    {
      title: "추천",
      link: "/recommend/userinfo",
    },
  ];

  const settings = user
    ? [
        {
          title: `${user.username}'s Profile`,
          link: "/profile",
        },
        {
          title: "Log out",
          link: "/logout",
        },
      ]
    : [
        {
          title: "Login",
          link: "/login",
        },
        {
          title: "Sign Up",
          link: "/signup",
        },
      ];

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
    <AppBar
      position="static"
      sx={{ mb: 8, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* <Link href="/"> */}
            <img
              onClick={() => {
                window.location.href = "/";
              }}
              style={{
                cursor: "pointer",
              }}
              src="/static/logo_icon.png"
              alt="Shutter Logo"
              width={40}
              height={40}
            />
            {/* </Link> */}

            <Box
              sx={{
                flexGrow: 1,
                marginLeft: 2,
                display: { xs: "flex", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <Link key={page.title} href={page.link}>
                  <a>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        mr: 2,
                        color:
                          router.pathname === page.link ? "black" : "white",
                        display: "block",
                        backgroundColor:
                          router.pathname === page.link ? "white" : "black",
                        border: "1px solid white",
                        "&:hover": {
                          color: "black",
                          backgroundColor: "white",
                        },
                      }}
                    >
                      {page.title}
                    </Button>
                  </a>
                </Link>
              ))}
            </Box>
          </Box>

          {/* ----------------모바일 햄버거 메뉴---------------- */}
          {/* <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>

              <IconButton
                  size='large'
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
                      <Link href={page.link}>
                        <a>
                          <Typography textAlign="center">{page.title}</Typography>
                        </a>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>

            </Box> */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar alt={user.username} src="" />
                ) : (
                  <Avatar
                    alt="no-user"
                    src=""
                    sx={{ backgroundColor: "#fff" }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                  <Link href={setting.link}>
                    <a>
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
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
