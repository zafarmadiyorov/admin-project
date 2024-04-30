import { Banner, BrandsPage, Categories, Dashboard, Login, Logout, Products } from "../pages";

export const routes = [
    {
        id: 1,
        path: '/',
        component: <Dashboard/>
    },
    {
        id: 2,
        path: '/products',
        component: <Products/>
    },
    {
        id: 3,
        path: '/categories',
        component: <Categories/>
    },
    {
        id: 4,
        path: '/login',
        component: <Login/>
    },
    {
        id: 8,
        path: '/logout',
        component: <Logout/>
    },
    {
        id: 5,
        path: '*',
        component: <Dashboard/>
    },
    {
        id: 6,
        path: '/brands',
        component: <BrandsPage/>
    },
    {
        id: 7,
        path: '/banner',
        component: <Banner/>
    },
]