import * as React from 'react';
import Link from 'next/link';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  Logout,
  Settings,
  Menu as MenuIcon,
} from '@mui/icons-material';
import style from './style.module.css';

interface Props {
  window?: () => Window;
}

const drawerWidth = 360;

const listMenu:any = [
	{
		name: 'Dashboard',
    path: '/',
	},
	{
		name: 'Project Management',
    path: '/dashboard',
	},
  {
		name: 'User Management',
    path: '/dashboard',
	},
  {
		name: 'Configuration',
    path: '/dashboard',
	},
  {
		name: 'Report',
    path: '/dashboard',
	},
];

const DashboardLayout = ({ children }:any, props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <div>
      <Toolbar/>
      <Divider />
      <List>
      {listMenu.map((item:any, index:any) => (
        <ListItem
          key={index}
          disablePadding>
          <Link 
            href={item.path} 
            passHref 
            legacyBehavior>
            <ListItemButton>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: '100%' }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
