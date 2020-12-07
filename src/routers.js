import Dashboard from "./containers/Dashboard";
import Categories from "./containers/Categories";
import NotFound from "./components/404";
import Brands from "./containers/Brands";
import Products from "./containers/Products";
import ProductFormEdit from "./components/product/ProductFormEdit";
import Blogs from "./containers/Blogs";
import Currencies from "./containers/Currencies";
import Reviews from "./containers/Reviews";
import Permissions from "./containers/Permissions";
import Roles from "./containers/Roles";
import Users from "./containers/Users";
import Coupons from "./containers/Coupons";
import Orders from "./containers/Orders";
import Banners from "./containers/Banners";
import UserDetails from "./containers/UserDetails";
import Messages from "./containers/Messages";

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
        path: '/profile',
        component: UserDetails
    },
    {
        path: '/products',
        component: Products
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
        path: '/permissions',
        component: Permissions
    },
    {
        path: '/roles',
        component: Roles
    },
    {
        path: '/users',
        component: Users
    },
    {
        path: '/coupons',
        component: Coupons
    },
    {
        path: '/banners',
        component: Banners
    },
    {
        path: '/orders',
        component: Orders
    },
    {
        path: '/messages',
        component: Messages
    },
    {
        path: '',
        component: NotFound
    },

];

export default routes;