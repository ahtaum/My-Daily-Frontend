import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <nav className="navbar sticky z-10 bg-gray-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>

                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        { user && (
                            <>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><button to="/logout" onClick={handleClick}>Logout</button></li>
                            </>
                        ) }
                        { !user && (
                            <>
                            <li><Link to="/signup">Signup</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            </>
                        ) }
                    </ul>

                    { user ? <label tabIndex="1" className="text-2xl font-bold">{ user.username }</label> : "" }
                </div>
            </div>
            
            <div className="navbar-end">
                <Link to="/" className="btn btn-ghost normal-case text-xl">My Daily Life</Link>
            </div>

        </nav>
    );
}
 
export default Navbar;