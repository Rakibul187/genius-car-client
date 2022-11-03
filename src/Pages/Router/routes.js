import Main from "../../Layout/Main";
import Login from "../Login/Login";
import SignUp from "../Login/SignUp";

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
            }
        ]
    }
])