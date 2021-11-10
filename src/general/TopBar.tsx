import { AppBar, Breadcrumbs, Grid, Link, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { StoreType } from './redux/RootReducer';

export default function TopBar() {
  const menuOptions = useSelector((state: StoreType) => state.menuOptions);
  return (
    <AppBar position="static" color="transparent" style={{ marginBottom: 10, paddingTop: 5 }}>
      <Toolbar>
        <div>
          <img src="logo.png" alt="logo" style={{ height: 70 }} />
        </div>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Breadcrumbs aria-label="breadcrumb" style={{ width: 400 }} separator="›">
            {menuOptions.map((option) => (
              <Link underline="hover" color={option.active ? 'text.primary' : 'inherit'} href="#">
                {option.context}
              </Link>
            ))}
          </Breadcrumbs>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
