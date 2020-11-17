import Dashboard from "./components/Dashboard";
import Categories from "./containers/Categories";
import NotFound from "./components/404";
import Brands from "./containers/Brands";
import ProductFormAdd from "./components/product/ProductFormAdd";
import Products from "./containers/Products";
import ProductFormEdit from "./components/product/ProductFormEdit";
import Blogs from "./containers/Blogs";
import Currencies from "./containers/Currencies";
import Reviews from "./containers/Reviews";

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
        path: '/products/edit/:id',
        component: ProductFormEdit
    },
    {
        path: '/blogs',
        component: Blogs
    },
    {
        path: '/currencies',
        component: Currencies
    },
    {
        path: '/reviews',
        component: Reviews
    },
    {
        path: '',
        component: NotFound
    },

];

export default routes;