import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Fade,
  Slide,
  Card,
  CardContent,
  Switch,
  Button,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
  Badge,
  Modal,
  Menu,
  MenuItem,
  Grid,
  Link as MuiLink,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Notifications as NotificationsIcon,
  AccountCircle as ProfileIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Styled Components
const SettingsCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  marginBottom: theme.spacing(4),
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const NotificationModal = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  p: 4,
  borderRadius: theme.shape.borderRadius * 2,
  outline: 'none',
  '&:focus': {
    outline: 'none',
  },
}));

const SettingsPage = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  // State management
  const [openNotification, setOpenNotification] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const openProfileMenu = Boolean(anchorEl);

  // Event handlers
  const handleOpenNotification = () => setOpenNotification(true);
  const handleCloseNotification = () => setOpenNotification(false);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);

  const handleProfileClick = () => {
    navigate('/profile');
    handleProfileMenuClose();
  };

  const handleSettingsClick = () => handleProfileMenuClose();
  const handleLogoutClick = () => {
    navigate('/login');
    handleProfileMenuClose();
  };

  const handleNotificationsToggle = () => setNotificationsEnabled((prev) => !prev);
  const handleUpdateAccount = () => alert('Account settings updated!'); // Placeholder for future API call

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Study Planner
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              aria-label="notifications"
              onClick={handleOpenNotification}
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="profile menu"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <ProfileIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openProfileMenu}
              onClose={handleProfileMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: { borderRadius: 1, mt: 1 },
              }}
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Notification Modal */}
      <Modal
        open={openNotification}
        onClose={handleCloseNotification}
        aria-labelledby="notification-modal-title"
      >
        <NotificationModal>
          <Typography
            id="notification-modal-title"
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}
          >
            Notifications
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You have 4 new notifications.
          </Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Button
              onClick={handleCloseNotification}
              variant="outlined"
              color="primary"
              sx={{ borderRadius: 2 }}
            >
              Close
            </Button>
          </Box>
        </NotificationModal>
      </Modal>

      {/* Settings Content */}
      <Container maxWidth="md" sx={{ py: 6, flexGrow: 1 }}>
        <Fade in={true} timeout={1000}>
          <Typography
            variant="h3"
            sx={{ textAlign: 'center', mb: 6, fontWeight: 700, color: 'text.primary' }}
          >
            Settings
          </Typography>
        </Fade>

        {/* Theme Settings */}
        <Slide direction="up" in={true} timeout={500}>
          <SettingsCard>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}
              >
                Theme Settings
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2,
                }}
              >
                <Typography variant="body1" color="text.primary">
                  Dark Mode
                </Typography>
                <IconButton
                  aria-label="toggle dark mode"
                  onClick={() => setDarkMode(!darkMode)}
                  color="inherit"
                  sx={{ p: 1 }}
                >
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Box>
            </CardContent>
          </SettingsCard>
        </Slide>

        {/* Notification Preferences */}
        <Slide direction="up" in={true} timeout={700}>
          <SettingsCard>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}
              >
                Notification Preferences
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2,
                }}
              >
                <Typography variant="body1" color="text.primary">
                  Enable Notifications
                </Typography>
                <Switch
                  checked={notificationsEnabled}
                  onChange={handleNotificationsToggle}
                  color="primary"
                  aria-label="toggle notifications"
                />
              </Box>
            </CardContent>
          </SettingsCard>
        </Slide>

        {/* Account Settings */}
        <Slide direction="up" in={true} timeout={900}>
          <SettingsCard>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}
              >
                Account Settings
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Update your account details below.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateAccount}
                sx={{ mt: 2, borderRadius: 2, px: 3 }}
              >
                Update Account
              </Button>
            </CardContent>
          </SettingsCard>
        </Slide>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 4,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}
              >
                Study Planner
              </Typography>
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} All Rights Reserved
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'center' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <MuiLink
                  href="#"
                  color="text.secondary"
                  underline="hover"
                  sx={{ fontSize: '0.875rem' }}
                >
                  About
                </MuiLink>
                <MuiLink
                  href="#"
                  color="text.secondary"
                  underline="hover"
                  sx={{ fontSize: '0.875rem' }}
                >
                  Contact
                </MuiLink>
                <MuiLink
                  href="#"
                  color="text.secondary"
                  underline="hover"
                  sx={{ fontSize: '0.875rem' }}
                >
                  Privacy Policy
                </MuiLink>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <IconButton
                aria-label="toggle dark mode"
                onClick={() => setDarkMode(!darkMode)}
                sx={{ bgcolor: 'action.hover', '&:hover': { bgcolor: 'action.focus' }, p: 1 }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default SettingsPage;
