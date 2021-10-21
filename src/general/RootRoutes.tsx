import { Redirect } from "react-router-dom";
import HomeRoutes from 'views/Home/HomeRoutes';
import ModBRoutes from 'views/ModB/MobBRoutes';

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />
  }
];

const routes = [
  ...HomeRoutes,
  ...ModBRoutes,
  ...redirectRoute,
];

export default routes;