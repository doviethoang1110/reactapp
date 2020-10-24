import Dashboard from "./components/Dashboard";
import Categories from "./containers/Categories";
import NotFound from "./components/404";
import Brands from "./containers/Brands";
import ProductFormAdd from "./components/product/ProductFormAdd";
import Products from "./containers/Products";

const routes = [
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path:'/categories',
        component: Categories
    },
    {
        path: '/brands',
        component: Brands
    },
    {
        path: '/products',
        component: Products
    },
    {
        path: '/products/add',
        component: ProductFormAdd
    },
    {
        path: '',
        component: NotFound
    },

];

export default routes;