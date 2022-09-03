import { useDailyContext } from "../hooks/useDailyContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import urlApi from '../config/urlApi';

const Data = ({ daily }) => {
    const { dispatch } = useDailyContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if(!user) {
            return
        }

        const response = await fetch(`${urlApi.apiUrl}my-daily/delete-daily/${daily._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (response.ok) {
          dispatch({type: 'DELETE_DAILY', payload: json})
        }
    }
    
    return (
        <div className="card w-100 bg-base-100 lg:shadow-xl shadow-2xl mb-5">
            <div className="card-body">
                
                <div className="relative">
                    <div className="absolute right-0"><span className="btn btn-error" onClick={handleClick}><FiTrash /></span></div>
                </div>

                <h2 className="card-title">{ daily.title }</h2>
                <p className="my-5 text-desc">{ daily.desc ? daily.desc.substring(0, 250) : "" }...</p>
                <p className="my-5 text-slate-500">{formatDistanceToNow(new Date(daily.createdAt), { addSuffix: true })}</p>

                <Link to={`/detail/${daily._id}`} className="underline text-blue-600 font-bold">Details</Link>

                <div className="card-actions justify-end">
                    <Link className="btn btn-success" to={`/edit/${daily._id}`}>Edit</Link>
                </div>
            </div>
        </div>
    );
}
 
export default Data;