import Main from "../../Layout/Main";
import Checkout from "../Checkout/Checkout";
import Login from "../Login/Login";
import SignUp from "../Login/SignUp";
import Orders from "../Orders/Orders";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Home } = require("../Home/Home/Home");

export const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>, children: [
            {
                path: '/', element: <Home></Home>
            },
            {
                path: '/login', element: <Login></Login>
            },
            {
                path: '/signup', element: <SignUp></SignUp>
            },
            {
                path: '/checkout/:id',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
            },
            {
                path: '/orders', element: <PrivateRoute><Orders></Orders></PrivateRoute>
            }
        ]
    }
])