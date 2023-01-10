import AppsIcon from '@mui/icons-material/Apps';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import InventoryIcon from '@mui/icons-material/Inventory';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { FC } from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout: FC<any> = ({ children }) => {
  const { currentUser, logout } = useAuth();

  return (
    <Box style={{ display: 'flex', height: '100%', width: '100%' }}>
      <Box sx={{ width: '300px' }}>
        <List>
          {!currentUser && (
            <>
              <Link to="/login">
                <ListItem button>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Login'} />
                </ListItem>
              </Link>
              <Link to="/register">
                <ListItem button>
                  <ListItemIcon>
                    <AddCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Register'} />
                </ListItem>
              </Link>
            </>
          )}

          {currentUser && (
            <>
             <ListItem button>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={currentUser.name} />
                </ListItem>
              <Link to="/value_streams">
                <ListItem button>
                  <ListItemIcon>
                    <ViewStreamIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Value Streams'} />
                </ListItem>
              </Link>
              <Link to="/value_streams_show">
                <ListItem button>
                  <ListItemIcon>
                    <ViewStreamIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Value Streams Show (TEST)'} />
                </ListItem>
              </Link>
              <Link to="/services">
                <ListItem button>
                  <ListItemIcon>
                    <DesignServicesIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Services'} />
                </ListItem>
              </Link>
              <Link to="/organizations">
                <ListItem button>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Organizations'} />
                </ListItem>
              </Link>
              <Link to="/products">
                <ListItem button>
                  <ListItemIcon>
                    <InventoryIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Products'} />
                </ListItem>
              </Link>
              <Link to="/applications">
                <ListItem button>
                  <ListItemIcon>
                    <AppsIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Applications'} />
                </ListItem>
              </Link>
              <ListItem
                button
                onClick={() => {
                  logout();
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
      <Box sx={{ width: 'inherit', height: 'inherit' }}>{children}</Box>
    </Box>
  );
}

export default Layout