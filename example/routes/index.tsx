import React from "react";
import { RouteConfig } from "react-router-config";
import Home from "@/pages/Home";
import { Redirect } from "react-router-dom";

const generateRedirect = (url: string) => <Redirect to={url} />;

const routes: Array<RouteConfig> = [
  {
    path: "/",
    exact: true,
    component: Home
  }
];

export default routes;
