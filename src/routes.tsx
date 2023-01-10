import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ApplicationsPage from './pages/ApplicationsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import ValueStreamsPage from './pages/value-stream/new';
import ValueStreamsShowPage from './pages/ValueStreamsShowPage';
import ValueStreamsListPage from './pages/value-stream/list';
import OrganizationListPage from './pages/organizations/list';
import OrganizationPage from './pages/organizations/new';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/register">
        <RegisterPage />
      </Route>
      <PrivateRoute exact path="/value_streams">
        <ValueStreamsListPage />
      </PrivateRoute>
      <PrivateRoute exact path="/value_streams/new">
        <ValueStreamsPage />
      </PrivateRoute>
      <PrivateRoute exact path="/value_streams/:id/edit">
        <ValueStreamsPage />
      </PrivateRoute>
      <PrivateRoute exact path="/value_streams_show">
        <ValueStreamsShowPage />
      </PrivateRoute>
      <PrivateRoute exact path="/services">
        <ServicesPage />
      </PrivateRoute>
      <PrivateRoute exact path="/organizations">
        <OrganizationListPage />
      </PrivateRoute>
      <PrivateRoute exact path="/organizations/new">
        <OrganizationPage />
      </PrivateRoute>
      <PrivateRoute exact path="/organizations/:id/edit">
        <OrganizationPage />
      </PrivateRoute>
      <PrivateRoute exact path="/products">
        <ProductsPage />
      </PrivateRoute>
      <PrivateRoute exact path="/applications">
        <ApplicationsPage />
      </PrivateRoute>
    </Switch>
  );
};

export default Routes;
