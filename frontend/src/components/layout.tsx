import { Outlet, useNavigate } from "react-router-dom";

export function Layout(){
    const navigate = useNavigate()
    const handler = async() => {
        navigate("/upload")
    }

    return(
        <div>
            <nav className="flex justify-between">
                <div>
                    Youtube
                </div>
                <div>
                    <button onClick={handler} className="cursor-pointer">
                        Upload
                    </button>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}