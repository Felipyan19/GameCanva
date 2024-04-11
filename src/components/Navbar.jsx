import * as React from "react";
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
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const pages = ["Inicio", "Registrarse", "Historico", "Posiciones"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static" style={{ background:
                "linear-gradient(to bottom, var(--azure-400), var(--azure-500))" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Canva Game
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={(event) => setAnchorElNav(!anchorElNav)}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Canva Game
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    navigate(`/${page}`);
                    handleCloseNavMenu();
                    console.log(page);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              ></Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AnimatePresence>
        {anchorElNav && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, var(--azure-400), var(--azure-950))",
              zIndex: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
          >
            <div style={{ textAlign: "center", color: "white" }}>
            <div
                style={{
                  color: "white",
                  position: "absolute",
                  top: "4rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  
                  onClick={() => {
                    setAnchorElNav(null); // Establecer el valor de anchorElNav a null al hacer clic en la "x"
                  }}
                >
                  <AdbIcon style={{ fontSize: "2rem" }} />
                  <Typography variant="h5">Game Canva</Typography>
                </IconButton>
                </div>
              </div>
              <div>
                {pages.map((page) => (
                  <MenuItem
                    style={{ marginTop: "2rem" }}
                    key={page}
                    onClick={() => {
                      navigate(`/${page}`);
                      setAnchorElNav(null); // Establecer el valor de anchorElNav a null al hacer clic en un elemento del menú
                    }}
                  >
                    <Typography variant="h5" onClick={() => console.log(page)}>
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </div>
              <div
                style={{
                  color: "white",
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <InstagramIcon
                    style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                  />
                  <Typography variant="h8">lalalalal.com</Typography>
                  <FacebookIcon
                    style={{ fontSize: "1.5rem", marginLeft: "1rem" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      ;
    </>
  );
}
export default Navbar;
