import { useContext, useEffect } from "react"
import { UserContext } from "../../context/userContext"
import { NavLink, Outlet, useNavigate } from "react-router-dom";




export default function AuthenticationPage() {

    const {setIsAuthenticated}= useContext(UserContext);

    const navigate= useNavigate();

    useEffect(() => {
        navigate("login");
    }, []);
    
    return (
        <div className="w-full bg-[#e6e7e8]">
            <div className="w-[400px] bg-white m-[auto]">
                <div className="p-[10px] sm:p-[40px] flex flex-col items-center justify-center">
                    <div className="flex justify-center items-center text-[14px] w-full mb-[1rem]">
                        <NavLink to={"login"} className={({isActive}) => 
                            isActive ? "bc-green text-white py-[1px]" : 
                            "bg-white border"}>
                            <p className="px-[60px] py-[10px]">LOGIN</p>
                        </NavLink>

                        <NavLink to={"register"} className={({isActive}) => 
                            isActive ? "bc-green text-white py-[1px]" : 
                            "bg-white border"}>
                            <p className="px-[50px] py-[10px]">REGISTER</p>
                        </NavLink>
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}