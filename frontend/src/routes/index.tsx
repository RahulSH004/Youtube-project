import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import SignIn  from "../pages/Signin";
import { Layout } from "../components/layout";
import Home from "../pages/Home";
import Videopage from "../pages/videopage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {index: true, element: <Home />},
            {path: "/signUp", element: <Signup />},
            {path: "/signIn", element: <SignIn />},
            {path: "/video/:id", element:<Videopage /> }
        ],
        
    },
])