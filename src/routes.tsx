import Edit from './page/Edit';
import Login from './page/Login';

const routers = [{
    path: '/',
    element: <Edit />,
    // exact: true,
},
{
    path: '/login',
    element: <Login />,
    // exact: true,
}]
export default routers;