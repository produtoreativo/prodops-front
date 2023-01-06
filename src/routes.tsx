import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ApplicationsPage from './pages/ApplicationsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import ValueStreamsPage from './pages/value-stream/new';
import ValueStreamsShowPage from './pages/ValueStreamsShowPage';
import ValueStreamsListPage from './pages/value-stream/llist';

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
      <PrivateRoute exact path="/value_streams_show">
        <ValueStreamsShowPage />
      </PrivateRoute>
      <PrivateRoute exact path="/services">
        <ServicesPage />
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
