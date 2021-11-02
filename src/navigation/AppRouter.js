import { Route, Switch } from "react-router-dom";

import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import BomPage from "../views/BomPage";
import BomDetailPage from "../views/BomDetailPage";

import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";

const routes = [
    { path: "/", component: HomePage, title: "homePage", isPrivate: false },
    { path: "/login", component: LoginPage, title: "loginPage", isPrivate: false },
    { path: "/register", component: RegisterPage, title: "registerPage", isPrivate: false },
    { path: "/bom", component: BomPage, title: "bomPage", isPrivate: true },
    { path: "/bom/:bomId", component: BomDetailPage, title: "bomDetailPage", isPrivate: true },
    { path: "*", component: NotFound, title: "notFound", isPrivate: false }
];

export default function AppRouter() {
    return (
        <Switch>
            {routes.map((route) => {
                return (
                    route.isPrivate ?
                        (
                            <PrivateRoute key={route.title} exact path={route.path} component={route.component} />
                        )
                        :
                        (
                            <Route key={route.title} exact path={route.path} component={route.component} />
                        )
                )
            })}
        </Switch>
    );
};