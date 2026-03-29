import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import SignIn  from "../pages/Signin";
import { Layout } from "../components/layout";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {path: "signup", element: <Signup />},
            {path: "signIn", element: <SignIn />}
        ]
    }
])