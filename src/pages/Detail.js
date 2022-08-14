import { useParams } from 'react-router-dom';
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
        <section className="container" id="detail-page">
            { daily && daily.map(data => (
                <div key={data._id}>
                    <h1>{data.title}</h1>
                </div>
            )) }
        </section>
    );
}
 
export default Detail;