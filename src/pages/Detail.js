import { useParams, Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEffect } from "react"
import { useDailyContext } from "../hooks/useDailyContext"
import { useAuthContext } from '../hooks/useAuthContext';
import './detail.css'

const Detail = () => {
    const { id } = useParams()
    const { daily, dispatch } = useDailyContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchDaily = async () => {
            if(!user) {
                return
            }
            
            const response = await fetch(`/api/my-daily/get-daily/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok) {
                dispatch({ type: 'GET_SINGLE_DAILY', payload: json })
            }
        }

        fetchDaily()
    }, [dispatch, user])

    return (
        <section className="container lg:p-0 p-5" id="detail-page">
            { daily && daily.map(data => (
                <div className="card w-full bg-base-100 shadow-xl my-8" key={ data._id }>
                    <div className="card-body">
                        <div>
                            <h1 className="card-title">{ data.title}</h1>
                            <p className="mt-1 text-slate-500">{formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}, { user.username }</p>
                        </div>
                        <p className="my-3 desc-detail">{ data.desc }</p>
                        
                        <Link className="link text-blue-600 font-bold" to="/">Kembali</Link>
                    </div>
                </div>
            )) }
        </section>
    );
}
 
export default Detail;