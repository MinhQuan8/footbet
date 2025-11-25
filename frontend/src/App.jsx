import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./pages/routes";
import api from "./services/api";

const App = () => {
    const INTERVAL_TIME = 15 * 60 * 1000;

    useEffect(() => {
        let activeInterval = true;

        (async () => {
            try {
                while (activeInterval) {
                    const res = await api.get("/bet/check");
                    if (!res.data.status) console.log("CAN NOT CHECK");

                    console.log(res);

                    await new Promise((resolve) => setTimeout(resolve, INTERVAL_TIME));
                }
            } catch (err) {
                console.log(err);
            }
        })();

        return () => {
            activeInterval = false;
        };
    });

    return (
        <Routes>
            {routes.map((route) => (
                <Route exact path={route.path} Component={route.component} key={route.path}></Route>
            ))}
        </Routes>
    );
};

export default App;
