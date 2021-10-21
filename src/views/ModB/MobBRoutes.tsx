import React from "react";

const modBRoutes = [
  {
    path: "/modb",
    component: React.lazy(() => import("./Container")),
  }
];

export default modBRoutes;