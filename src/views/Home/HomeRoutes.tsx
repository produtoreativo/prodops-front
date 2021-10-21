import React from "react";

const homeRoutes = [
  {
    path: "/home",
    component: React.lazy(() => import("./Container")),
  }
];

export default homeRoutes;