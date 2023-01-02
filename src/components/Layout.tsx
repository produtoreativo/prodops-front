import AppsIcon from '@mui/icons-material/Apps';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import InventoryIcon from '@mui/icons-material/Inventory';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FC } from 'react';

import { Link } from 'react-router-dom';

const Layout: FC<any> = ({ children }) => {
  return (
    <Box style={{ display: 'flex', height: '100%', width: '100%' }}>
    <Box sx={{ width: '300px' }}>
      <List>
        <Link to="/value_streams">
          <ListItem button>
            <ListItemIcon>
              <ViewStreamIcon />
            </ListItemIcon>
            <ListItemText primary={'Value Streams'} />
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
      </List>
    </Box>
    <Box sx={{ width: 'inherit', height: 'inherit' }}>
      { children }
    </Box>
  </Box>
  )
}

export default Layout