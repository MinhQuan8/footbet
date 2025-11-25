import { lazy } from "react";

export default {
    path: "/register",
    exact: true,
    public: true,
    component: lazy(() => import("."))
};
