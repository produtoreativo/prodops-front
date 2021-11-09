import { AppBar, Breadcrumbs, Grid, Link, Toolbar } from '@mui/material';

export default function TopBar() {
  return (
    <AppBar position="static" color="transparent" style={{ marginBottom: 10, paddingTop: 5 }}>
      <Toolbar>
        <div>
          <img src="logo.png" alt="logo" style={{ height: 70 }} />
        </div>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Breadcrumbs aria-label="breadcrumb" style={{ width: 400 }} separator="›">
            <Link underline="hover" color="text.primary" href="#">
              Produto
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Estagio do Produto
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Avaliação
            </Link>
          </Breadcrumbs>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
