import { lazy } from "react";

export default {
    path: "/fixture/:fixtureId",
    exact: true,
    public: true,
    component: lazy(() => import("."))
};
