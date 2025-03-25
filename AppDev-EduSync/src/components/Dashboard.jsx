import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { theme } from '../theme';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Badge,
  Chip,
  Divider,
  Tooltip,
  AppBar,
  Toolbar,
  CssBaseline,
  useMediaQuery,
  Collapse,
  TextField,
  ListItemButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  CircularProgress,
  Switch,
  FormControlLabel,
  Menu,
  MenuItem,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import { ThemeProvider, styled, alpha } from '@mui/material/styles';
import {
  Event as EventIcon,
  ListAlt as ListIcon,
  Timer as TimerIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Add as AddIcon,
  Done as DoneIcon,
  AccessTime as AccessTimeIcon,
  FormatQuote as QuoteIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AnalyticsIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';

// Enhanced Styled Components
const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    background: theme.palette.background.default,
    borderRight: 'none',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(3),
    transition: 'all 0.3s ease',
    [theme.breakpoints.down('sm')]: {
      width: 0,
      '&.open': { width: 240 },
    },
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 12,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main,
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 12,
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3),
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderColor: theme.palette.primary.main,
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(3);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState({ 'Core Features': true, 'Collaboration & Resources': true });
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finish report', completed: false, priority: 'high' },
    { id: 2, text: 'Prepare presentation', completed: true, priority: 'medium' },
    { id: 3, text: 'Schedule meeting', completed: false, priority: 'low' },
    { id: 4, text: 'Review notes', completed: false, priority: 'medium' },
    { id: 5, text: 'Submit assignment', completed: true, priority: 'high' },
    { id: 6, text: 'Plan project timeline', completed: false, priority: 'low' },
    { id: 7, text: 'Email client', completed: false, priority: 'medium' },
    { id: 8, text: 'Organize files', completed: true, priority: 'low' },
    { id: 9, text: 'Attend webinar', completed: false, priority: 'high' },
    { id: 10, text: 'Update calendar', completed: false, priority: 'medium' },
  ]);
  const [darkMode, setDarkMode] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, priority: 'medium' }]);
      setNewTask('');
    }
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <EventIcon />, link: '/dashboard', tooltip: 'Dashboard' },
    { text: 'To-Do List', icon: <ListIcon />, link: '/todo', tooltip: 'To-Do List' },
    { text: 'Pomodoro', icon: <TimerIcon />, link: '/pomodoro', tooltip: 'Pomodoro Timer' },
    { text: 'Collaboration', icon: <GroupIcon />, link: '/collaboration', tooltip: 'Collaboration' },
    { text: 'Resources', icon: <SchoolIcon />, link: '/resources', tooltip: 'Academic Resources' },
    { text: 'Analytics', icon: <AnalyticsIcon />, link: '/analytics', tooltip: 'Analytics' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Team Meeting', date: 'Tomorrow, 10:00 AM', type: 'meeting' },
    { id: 2, title: 'Project Deadline', date: 'Mar 28, 5:00 PM', type: 'deadline' },
    { id: 3, title: 'Study Group', date: 'Mar 30, 2:00 PM', type: 'study' },
    { id: 4, title: 'Client Review', date: 'Apr 1, 3:00 PM', type: 'review' },
    { id: 5, title: 'Workshop', date: 'Apr 3, 11:00 AM', type: 'workshop' },
    { id: 6, title: 'Seminar', date: 'Apr 5, 9:00 AM', type: 'seminar' },
    { id: 7, title: 'Project Kickoff', date: 'Apr 7, 1:00 PM', type: 'meeting' },
    { id: 8, title: 'Team Sync', date: 'Apr 9, 10:00 AM', type: 'meeting' },
    { id: 9, title: 'Presentation Prep', date: 'Apr 11, 2:00 PM', type: 'deadline' },
    { id: 10, title: 'Final Review', date: 'Apr 13, 4:00 PM', type: 'review' },
  ];

  const recentActivity = [
    { id: 1, action: 'Completed Task: Finish Report', time: '2 hours ago', icon: <DoneIcon /> },
    { id: 2, action: 'Started Pomodoro Session', time: '4 hours ago', icon: <TimerIcon /> },
    { id: 3, action: 'Added Event: Team Sync', time: 'Yesterday', icon: <EventIcon /> },
    { id: 4, action: 'Joined Study Group', time: '2 days ago', icon: <GroupIcon /> },
    { id: 5, action: 'Updated Profile', time: '3 days ago', icon: <PersonIcon /> },
    { id: 6, action: 'Shared Document', time: '4 days ago', icon: <BookmarkIcon /> },
    { id: 7, action: 'Completed Goal: Read 20 pages', time: '5 days ago', icon: <DoneIcon /> },
    { id: 8, action: 'Reviewed Notes', time: '6 days ago', icon: <ListIcon /> },
    { id: 9, action: 'Scheduled Meeting', time: '1 week ago', icon: <EventIcon /> },
    { id: 10, action: 'Updated Task List', time: '1 week ago', icon: <ListIcon /> },
  ];

  const progressData = [
    { label: 'Project A', value: 75, color: 'primary' },
    { label: 'Project B', value: 40, color: 'secondary' },
    { label: 'Study Goals', value: 90, color: 'success' },
    { label: 'Team Tasks', value: 60, color: 'warning' },
    { label: 'Personal Goals', value: 85, color: 'info' },
    { label: 'Work Progress', value: 55, color: 'error' },
  ];

  const analyticsData = [
    { label: 'Tasks Completed', value: 45, trend: '+10%' },
    { label: 'Focus Hours', value: '32h', trend: '+5h' },
    { label: 'Events Attended', value: 12, trend: '+3' },
  ];

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === 1) return !task.completed;
    if (activeTab === 2) return task.completed;
    return true;
  }).filter((task) => task.text.toLowerCase().includes(searchQuery.toLowerCase()));

  const priorityColors = {
    high: '#ff4444',
    medium: '#ffbb33',
    low: '#00C851',
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            bgcolor: darkMode ? '#121212' : '#f5f5f5',
          }}
        >
          <CircularProgress size={60} thickness={4} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          bgcolor: darkMode ? '#121212' : '#f5f5f5',
        }}
      >
        {/* AppBar for Mobile */}
        {isMobile && (
          <AppBar
            position="fixed"
            sx={{
              bgcolor: darkMode ? '#1e1e1e' : '#ffffff',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              borderBottom: darkMode ? '1px solid #2a2f3d' : '1px solid #e0e0e0',
            }}
          >
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                <MenuIcon sx={{ color: darkMode ? '#ffffff' : '#333333' }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{
                  flexGrow: 1,
                  color: darkMode ? '#ffffff' : '#333333',
                }}
              >
                Dashboard
              </Typography>
              <IconButton onClick={toggleDarkMode}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>
        )}

        {/* Enhanced Sidebar Drawer */}
        <DrawerStyled
          variant={isMobile ? 'temporary' : 'permanent'}
          open={drawerOpen}
          onClose={toggleDrawer}
          className={drawerOpen ? 'open' : ''}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
              px: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 64,
                height: 64,
                mb: 2,
                fontSize: '1.5rem',
              }}
            >
              K
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 'bold',
              }}
            >
              Kevin Smith
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mb: 2,
              }}
            >
              Admin User
            </Typography>
            <FormControlLabel
              control={
                <Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />
              }
              label={darkMode ? 'Dark Mode' : 'Light Mode'}
              sx={{ mb: 2 }}
            />
          </Box>

          <Box sx={{ width: '100%', px: 2, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  background: darkMode ? '#2a2f3d' : '#f0f0f0',
                },
              }}
            />
          </Box>

          <List sx={{ width: '100%' }}>
            {menuItems.map((item) => (
              <ListItem
                button
                component={Link}
                to={item.link}
                key={item.text}
                sx={{
                  borderRadius: '12px',
                  mx: 1,
                  mb: 1,
                  '&:hover': {
                    bgcolor: darkMode
                      ? alpha(theme.palette.primary.main, 0.1)
                      : alpha(theme.palette.primary.main, 0.05),
                  },
                  '&.Mui-selected': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: theme.palette.primary.main,
                    minWidth: '40px',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 'medium',
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2, mx: 2 }} />

          <List sx={{ width: '100%', mt: 'auto' }}>
            <ListItem
              button
              sx={{
                borderRadius: '12px',
                mx: 1,
                '&:hover': {
                  bgcolor: darkMode
                    ? alpha(theme.palette.primary.main, 0.1)
                    : alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: theme.palette.text.secondary,
                  minWidth: '40px',
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                borderRadius: '12px',
                mx: 1,
                '&:hover': {
                  bgcolor: darkMode
                    ? alpha(theme.palette.primary.main, 0.1)
                    : alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: theme.palette.text.secondary,
                  minWidth: '40px',
                }}
              >
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>
          </List>
        </DrawerStyled>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            bgcolor: darkMode ? '#121212' : '#f5f5f5',
            width: { sm: 'calc(100% - 240px)', md: 'calc(100% - 240px)' },
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {isMobile && <Box sx={{ height: '64px' }} />}

          {/* Header Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 'bold',
                  mb: 0.5,
                }}
              >
                Welcome, Kevin!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                Here's what's happening today
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!isMobile && (
                <IconButton onClick={toggleDarkMode}>
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              )}
              <Badge badgeContent={notifications} color="error" overlap="circular">
                <IconButton>
                  <NotificationsIcon
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                </IconButton>
              </Badge>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon sx={{ color: theme.palette.text.secondary }} />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Stats Section */}
          <Grid container spacing={3} sx={{ mb: 4, flexShrink: 0 }}>
            {[
              { icon: <EventIcon />, title: 'Total Events', value: '8,739.76', trend: '+12%' },
              { icon: <ListIcon />, title: 'Tasks Today', value: '146.76', trend: '+5%' },
              { icon: <TimerIcon />, title: 'Focus Hours', value: '12.5', trend: '+2.1h' },
              { icon: <GroupIcon />, title: 'Group Projects', value: '3 Active', trend: '1 New' },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatCard>
                  <Box
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      borderRadius: '12px',
                      p: 1.5,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {React.cloneElement(stat.icon, {
                      sx: {
                        color: theme.palette.primary.main,
                        fontSize: '1.8rem',
                      },
                    })}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 0.5,
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Typography
                        variant="h4"
                        sx={{
                          color: theme.palette.text.primary,
                          fontWeight: 'bold',
                          mr: 1,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Chip
                        label={stat.trend}
                        size="small"
                        sx={{
                          bgcolor: alpha(theme.palette.success.main, 0.2),
                          color: theme.palette.success.main,
                          fontWeight: 'bold',
                        }}
                      />
                    </Box>
                  </Box>
                </StatCard>
              </Grid>
            ))}
          </Grid>

          {/* Quick Add Task & Upcoming Events */}
          <Grid container spacing={3} sx={{ mb: 4, flexGrow: 1, minHeight: '500px' }}>
            {/* Quick Add Task */}
            <Grid item xs={12} md={6}>
              <StyledCard sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 'bold',
                      }}
                    >
                      My Tasks
                    </Typography>
                    <Tabs
                      value={activeTab}
                      onChange={handleTabChange}
                      sx={{
                        '& .MuiTabs-indicator': {
                          backgroundColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      <Tab label="All" />
                      <Tab label="Active" />
                      <Tab label="Completed" />
                    </Tabs>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Add a new task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      sx={{
                        mr: 1,
                        '& .MuiOutlinedInput-root': {
                          background: darkMode ? '#2a2f3d' : '#f0f0f0',
                          color: theme.palette.text.primary,
                          borderRadius: '12px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.primary.main, 0.2),
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddTask}
                      sx={{
                        minWidth: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        bgcolor: theme.palette.primary.main,
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </Box>

                  <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {filteredTasks.map((task) => (
                      <ListItemButton
                        key={task.id}
                        onClick={() => handleCompleteTask(task.id)}
                        sx={{
                          borderRadius: '8px',
                          mb: 1,
                          bgcolor: task.completed
                            ? darkMode
                              ? alpha('#00C851', 0.1)
                              : alpha('#00C851', 0.05)
                            : 'transparent',
                          '&:hover': {
                            bgcolor: darkMode ? '#2a2f3d' : '#f0f0f0',
                          },
                        }}
                      >
                        <ListItemIcon>
                          {task.completed ? (
                            <DoneIcon sx={{ color: '#00C851' }} />
                          ) : (
                            <AccessTimeIcon sx={{ color: priorityColors[task.priority] }} />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={task.text}
                          primaryTypographyProps={{
                            color: task.completed
                              ? theme.palette.text.secondary
                              : theme.palette.text.primary,
                            textDecoration: task.completed ? 'line-through' : 'none',
                            fontWeight: task.completed ? 'normal' : 'medium',
                          }}
                        />
                        {!task.completed && (
                          <Box
                            sx={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              bgcolor: priorityColors[task.priority],
                              ml: 1,
                            }}
                          />
                        )}
                      </ListItemButton>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Upcoming Events */}
            <Grid item xs={12} md={6}>
              <StyledCard sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 'bold',
                      mb: 3,
                    }}
                  >
                    Upcoming Events
                  </Typography>
                  <TableContainer sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              color: theme.palette.text.secondary,
                              fontWeight: 'bold',
                              borderBottom: darkMode ? '1px solid #2a2f3d' : '1px solid #e0e0e0',
                            }}
                          >
                            Event
                          </TableCell>
                          <TableCell
                            sx={{
                              color: theme.palette.text.secondary,
                              fontWeight: 'bold',
                              borderBottom: darkMode ? '1px solid #2a2f3d' : '1px solid #e0e0e0',
                            }}
                          >
                            Date
                          </TableCell>
                          <TableCell
                            sx={{
                              color: theme.palette.text.secondary,
                              fontWeight: 'bold',
                              borderBottom: darkMode ? '1px solid #2a2f3d' : '1px solid #e0e0e0',
                            }}
                          >
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {upcomingEvents.map((event) => (
                          <TableRow
                            key={event.id}
                            sx={{
                              '&:hover': {
                                bgcolor: darkMode ? '#2a2f3d' : '#f5f5f5',
                              },
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.palette.text.primary,
                                borderBottom: darkMode ? '1px solid #2a2f3d' : '1px solid #e0e0e0',
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box
                                  sx={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    bgcolor: theme.palette.primary.main,
                                    mr: 1.5,
                                  }}
                                />
                                {event.title}
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.palette.text.secondary,
                                borderBottom: darkMode ? '1px solid #2a2f3d' : '1px solid #e0e0e0',
                              }}
                            >
                              {event.date}
                            </TableCell>
                            <TableCell
                              sx={{
                                borderBottom: darkMode ? '1px solid #2a2f3d' : '1px solid #e0e0e0',
                              }}
                            >
                              <Button
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderRadius: '20px',
                                  textTransform: 'none',
                                  borderColor: alpha(theme.palette.primary.main, 0.5),
                                  color: theme.palette.primary.main,
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    borderColor: theme.palette.primary.main,
                                  },
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button
                    fullWidth
                    sx={{
                      mt: 2,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    View All Events
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>

          {/* Feature Cards */}
          <Grid container spacing={3} sx={{ mb: 4, flexGrow: 1, minHeight: '400px' }}>
            {[
              {
                title: 'Core Features',
                items: [
                  {
                    icon: <EventIcon />,
                    title: 'Event Calendar',
                    desc: 'Sync with Google, Apple, or Outlook.',
                    action: 'View Calendar',
                    link: '/calendar',
                  },
                  {
                    icon: <ListIcon />,
                    title: 'To-Do List',
                    desc: 'Manage tasks with priority and due dates.',
                    action: 'View Tasks',
                    link: '/todo',
                  },
                  {
                    icon: <TimerIcon />,
                    title: 'Pomodoro Timer',
                    desc: 'Focus with timed study sessions.',
                    action: 'Start Timer',
                    link: '/pomodoro',
                  },
                ],
              },
              {
                title: 'Collaboration & Resources',
                items: [
                  {
                    icon: <GroupIcon />,
                    title: 'Collaboration',
                    desc: 'Share schedules and manage projects.',
                    action: 'Collaborate',
                    link: '/collaboration',
                  },
                  {
                    icon: <SchoolIcon />,
                    title: 'Academic Assistance',
                    desc: 'Access resources and GPA calculator.',
                    action: 'Explore',
                    link: '/resources',
                  },
                  {
                    icon: <AnalyticsIcon />,
                    title: 'Productivity Analytics',
                    desc: 'Track your performance metrics.',
                    action: 'View Stats',
                    link: '/analytics',
                  },
                ],
              },
            ].map((section, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ mb: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                    onClick={() => handleExpand(section.title)}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 'bold',
                        mr: 1,
                      }}
                    >
                      {section.title}
                    </Typography>
                    {expanded[section.title] ? (
                      <ExpandLessIcon sx={{ color: theme.palette.primary.main }} />
                    ) : (
                      <ExpandMoreIcon sx={{ color: theme.palette.text.secondary }} />
                    )}
                  </Box>
                  <Collapse in={expanded[section.title] || !isMobile}>
                    <Grid container spacing={3}>
                      {section.items.map((item, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                          <StyledCard sx={{ minHeight: '200px' }}>
                            <CardContent
                              sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                p: 3,
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  mb: 2,
                                  p: 1.5,
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  borderRadius: '12px',
                                  width: 'fit-content',
                                }}
                              >
                                {React.cloneElement(item.icon, {
                                  sx: {
                                    color: theme.palette.primary.main,
                                    fontSize: '1.5rem',
                                  },
                                })}
                              </Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: theme.palette.text.primary,
                                  fontWeight: 'bold',
                                  mb: 1,
                                }}
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: theme.palette.text.secondary,
                                  mb: 3,
                                  flexGrow: 1,
                                }}
                              >
                                {item.desc}
                              </Typography>
                              <Button
                                variant="contained"
                                component={Link}
                                to={item.link}
                                sx={{
                                  bgcolor: theme.palette.primary.main,
                                  color: '#ffffff',
                                  borderRadius: '12px',
                                  textTransform: 'none',
                                  fontWeight: 'bold',
                                  '&:hover': {
                                    bgcolor: theme.palette.primary.dark,
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                  },
                                  mt: 'auto',
                                  alignSelf: 'flex-start',
                                }}
                              >
                                {item.action}
                              </Button>
                            </CardContent>
                          </StyledCard>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Recent Activity, Progress Tracker, Quick Analytics & Motivational Quote */}
          <Grid container spacing={3} sx={{ mb: 4, flexGrow: 1, minHeight: '500px' }}>
            {/* Recent Activity */}
            <Grid item xs={12} md={4}>
              <StyledCard sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 'bold',
                      mb: 3,
                    }}
                  >
                    Recent Activity
                  </Typography>
                  <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {recentActivity.map((activity) => (
                      <ListItem
                        key={activity.id}
                        sx={{
                          px: 0,
                          '&:not(:last-child)': {
                            borderBottom: darkMode ? '1px solid #2a2f3d' : '1px solid #f0f0f0',
                            pb: 2,
                            mb: 2,
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: '40px',
                            color: theme.palette.primary.main,
                          }}
                        >
                          {activity.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.action}
                          secondary={activity.time}
                          primaryTypographyProps={{
                            color: theme.palette.text.primary,
                            fontWeight: 'medium',
                          }}
                          secondaryTypographyProps={{
                            color: theme.palette.text.secondary,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    fullWidth
                    sx={{
                      mt: 2,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    View All Activity
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Progress Tracker */}
            <Grid item xs={12} md={4}>
              <StyledCard sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 'bold',
                      mb: 3,
                    }}
                  >
                    Progress Tracker
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    {progressData.map((progress, index) => (
                      <Box key={index} sx={{ mb: 3 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 'medium',
                            }}
                          >
                            {progress.label}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 'bold',
                            }}
                          >
                            {progress.value}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={progress.value}
                          color={progress.color}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: darkMode ? '#2a2f3d' : '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 5,
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      mt: 4,
                      p: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      borderRadius: '12px',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.primary,
                        mb: 1,
                        fontWeight: 'medium',
                      }}
                    >
                      Weekly Goal
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 'bold',
                      }}
                    >
                      78% Completed
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={78}
                      color="primary"
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        mt: 1,
                        backgroundColor: darkMode ? '#2a2f3d' : '#e0e0e0',
                      }}
                    />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Quick Analytics */}
            <Grid item xs={12} md={4}>
              <StyledCard sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 'bold',
                      mb: 3,
                    }}
                  >
                    Quick Analytics
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    {analyticsData.map((analytic, index) => (
                      <Box
                        key={index}
                        sx={{
                          mb: 3,
                          p: 2,
                          borderRadius: '8px',
                          bgcolor: darkMode ? '#2a2f3d' : '#f5f5f5',
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 'medium',
                            }}
                          >
                            {analytic.label}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 'bold',
                            }}
                          >
                            {analytic.value}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TrendingUpIcon
                            sx={{
                              color: theme.palette.success.main,
                              fontSize: '1.2rem',
                              mr: 1,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.success.main,
                            }}
                          >
                            {analytic.trend}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    fullWidth
                    component={Link}
                    to="/analytics"
                    sx={{
                      mt: 2,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    View Detailed Analytics
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>

          {/* Motivational Quote */}
          <Grid container spacing={3} sx={{ mb: 4, flexGrow: 1, minHeight: '200px' }}>
            <Grid item xs={12}>
              <StyledCard sx={{ height: '100%' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <QuoteIcon
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: '2.5rem',
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      mb: 1,
                      fontStyle: 'italic',
                    }}
                  >
                    "Success is the sum of small efforts, repeated day in and day out."
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                    }}
                  >
                    — Robert Collier
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
