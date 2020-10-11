import Dashboard from "./components/Dashboard";
import Categories from "./containers/Categories";
import NotFound from "./components/404";

const routes = [
    {
        path: '/dashboard',
        exact: true,
        component: Dashboard
    },
    {
        path:'/categories',
        exact: false,
        component: Categories
    },
    {
        path: '',
        exact: false,
        component: NotFound
    }
];

export default routes;