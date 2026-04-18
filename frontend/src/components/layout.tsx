import { Outlet, useNavigate } from "react-router-dom";

export function Layout(){
    const navigate = useNavigate()
    const handler = async() => {
        //check if user is signed in or not 

        navigate("/upload")
    }

    return(
        <div>
            <nav className="flex justify-between">
                <div 
                    onClick={() => navigate("/")}
                    className="font-bold text-xl cursor-pointer"
                >
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