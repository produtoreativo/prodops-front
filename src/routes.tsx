import { Route, Switch } from 'react-router-dom';
import ApplicationsPage from './pages/ApplicationsPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import ValueStreamsPage from './pages/ValueStreamsPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/value_streams">
        <ValueStreamsPage />
      </Route>
      <Route exact path="/services">
        <ServicesPage />
      </Route>
      <Route exact path="/products">
        <ProductsPage />
      </Route>
      <Route exact path="/applications">
        <ApplicationsPage />
      </Route>
    </Switch>
  );
};

export default Routes;
