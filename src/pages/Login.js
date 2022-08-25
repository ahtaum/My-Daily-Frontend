import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom";
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        await login(username, password)
    }

    return (
        <section id="login-form" className="container my-5 lg:p-0 p-5">

            <div className="card bg-base-100 shadow-xl lg:w-96 mx-auto">
                <div className="card-body">        
                    <form onSubmit={handleSubmit}>

                        <h3 className="text-center text-3xl my-3 font-bold">Login</h3>

                        { error && 
                            <div className="alert alert-error shadow-lg my-3">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{ error }</span>
                                </div>
                            </div>
                        }

                        <div className="mb-3">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" placeholder="Your Username..." className="input input-bordered w-full lg:max-w-xs" onChange={(e) => setUsername(e.target.value)} value={username} />
                        </div>

                        <div className="mb-3">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Your Password..." className="input input-bordered w-full lg:max-w-xs" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                        
                        <div>
                            <button className="btn btn-primary w-full" disabled={isLoading}>Login</button>
                            <Link className="btn btn-success w-full mt-2" disabled={isLoading} to="/signup">Signup</Link>
                        </div>

                    </form>
                </div>
            </div>

        </section>
    );
}
 
export default Login;