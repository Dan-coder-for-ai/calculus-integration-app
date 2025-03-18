import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import {
  Functions as FunctionsIcon,
  TrendingUp as TrendingUpIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

interface SidebarProps {
  selectedTab: number;
  onTabChange: (index: number) => void;
}

const menuItems = [
  { text: 'Function Plot', icon: <FunctionsIcon /> },
  { text: 'Derivatives', icon: <TrendingUpIcon /> },
  { text: 'Integrals', icon: <TimelineIcon /> },
  { text: 'Higher Derivatives', icon: <SpeedIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ selectedTab, onTabChange }) => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          mt: '64px',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={selectedTab === index}
                onClick={() => onTabChange(index)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar; 