import './notFound.css';
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <section id="notFound" className="container my-10">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center mx-auto">
                    <h2 className="font-bold text-4xl">Page Not Found!</h2>
                    <img src={window.location.origin + "/img/mmm.gif"} className="h-72 my-5" />
                    <p>go back to <Link to="/" className="underline text-cyan-500">Previous</Link> Page </p>
                </div>
            </div>
        </section>
    );
}
 
export default NotFound;