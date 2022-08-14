import './home.css';
import { useEffect } from "react"
import { useDailyContext } from "../hooks/useDailyContext"
import { useAuthContext } from '../hooks/useAuthContext';
import Data from "../components/Data"
import FormCreate from "../components/FormCreate"

const Home = () => {
    const { daily, dispatch } = useDailyContext()
    const { user } = useAuthContext()
    
    useEffect(() => {
        const fetchDaily = async () => {
            const response = await fetch(`/api/my-daily`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_DAILY', payload: json})
            }
        }

        if(user) {
            fetchDaily()
        }
    }, [dispatch, user])
    
    return (
        <section className="container my-5 mt-14" id="home">

            <h1 className="mb-3 lg:mb-5 font-bold text-2xl text-center lg:text-left">The Daily</h1>

            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:p-0 p-5 md:grid md:grid-cols-2 md:gap-8 md:p-5">

                <div>
                    { daily && daily.map(dataDaily => (
                        <Data daily={dataDaily} key={dataDaily._id} />
                    )) }
                </div>

                <FormCreate />

            </div>

        </section>
    );
}
 
export default Home;