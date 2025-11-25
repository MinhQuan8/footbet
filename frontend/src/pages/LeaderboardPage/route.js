import { lazy } from "react";

export default {
    path: "/leaderboard",
    exact: true,
    public: true,
    component: lazy(() => import("."))
};
