import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import MenuIcon from "@mui/icons-material/Menu";
import PlaceIcon from "@mui/icons-material/Place";
import CommentIcon from "@mui/icons-material/Comment";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DownloadIcon from "@mui/icons-material/Download";

export default function TopNavbarMUI({ user, isAdmin, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const pathname = location.pathname;

  const tabs = [
    { path: "/", label: "Inicio", icon: <HomeIcon fontSize="small" /> },
    {
      path: "/lugares",
      label: "Lugares",
      icon: <PlaceIcon fontSize="small" />,
    },
    {
      path: "/descargar",
      label: "Descargar",
      icon: <DownloadIcon fontSize="small" />,
    },

    ...(isAdmin
      ? [
          {
            path: "/comentarios",
            label: "Comentarios",
            icon: <CommentIcon fontSize="small" />,
          },
        ]
      : []),
    ...(user
      ? []
      : [
          {
            path: "/login",
            label: "Login",
            icon: <LoginIcon fontSize="small" />,
          },
        ]),
    ...(isAdmin
      ? [
          {
            path: "/admin",
            label: "Admin",
            icon: <AdminPanelSettingsIcon fontSize="small" />,
          },
        ]
      : []),
  ];

  const go = (path) => {
    navigate(path);
    setAnchorEl(null);
  };

  const isActive = (path) => pathname === path;

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: "#DD6F00",
      }}
    >
      <Toolbar className="container d-flex align-items-center justify-content-between gap-2">
        {/* LOGO / NOMBRE */}
        <Box className="d-flex align-items-center gap-2">
          <Typography variant="h6" sx={{ fontWeight: 800, color: "white" }}>
            Vision Touristic
          </Typography>

          {user && (
            <Chip
              size="small"
              label={isAdmin ? "admin" : "usuario"}
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "rgba(255,255,255,.6)",
              }}
            />
          )}
        </Box>

        {/* NAV DESKTOP */}
        <Box className="d-none d-md-flex align-items-center gap-1">
          {tabs.map((t) => (
            <Button
              key={t.path}
              startIcon={t.icon}
              onClick={() => go(t.path)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                color: "white",
                backgroundColor: isActive(t.path)
                  ? "#B85A00"
                  : "transparent",
                "&:hover": {
                  backgroundColor: "#C96300",
                },
              }}
            >
              {t.label}
            </Button>
          ))}
        </Box>

        {/* ACCIONES */}
        <Box className="d-flex align-items-center gap-2">
          {/* BOTÓN ABRIR APP */}
          <Button
            variant="contained"
            component="a"
            href="https://drive.google.com/file/d/1EBz5S5X9W0id6LTf6xSzxyuVzkF3lCOH/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 800,
              backgroundColor: "#8C3F00",
              "&:hover": {
                backgroundColor: "#7A3600",
              },
            }}
          >
            Abrir app
          </Button>

          {/* LOGOUT */}
          {user && (
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={onLogout}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                color: "white",
                borderColor: "rgba(255,255,255,.6)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,.12)",
                },
              }}
              className="d-none d-sm-inline-flex"
            >
              Cerrar sesión
            </Button>
          )}

          {/* MENU MOBILE */}
          <IconButton
            color="inherit"
            className="d-md-none"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            {tabs.map((t) => (
              <MenuItem key={t.path} onClick={() => go(t.path)}>
                <Box className="d-flex align-items-center gap-2">
                  {t.icon}
                  <span>{t.label}</span>
                </Box>
              </MenuItem>
            ))}

            {user && (
              <>
                <Divider />
                <MenuItem onClick={onLogout}>
                  <Box className="d-flex align-items-center gap-2">
                    <LogoutIcon fontSize="small" />
                    <span>Cerrar sesión</span>
                  </Box>
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
