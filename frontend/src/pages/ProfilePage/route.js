import { lazy } from "react";

export default {
    path: "/profile",
    exact: true,
    public: true,
    component: lazy(() => import("."))
};
