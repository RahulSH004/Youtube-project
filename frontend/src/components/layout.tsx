import { Outlet } from "react-router-dom";

export function Layout(){
    return(
        <div>
            <nav>Navbar here</nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}