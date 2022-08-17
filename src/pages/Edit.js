import './edit.css'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useDailyContext } from '../hooks/useDailyContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Edit = () => {

    const { dispatch } = useDailyContext()
    const { user } = useAuthContext()
    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('Anda Harus Login')
            return
        }

        const daily = {title, desc}

        const response = await fetch(`https://my-daily-backend.herokuapp.com/api/my-daily/update-daily/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(daily),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': `Bearer ${user.token}`
            }
          })
        const json = await response.json()

        if(json.error) {
            setError(json.error)
        }
        if(response.ok) {
            setError('')
            setTitle('')
            setDesc('')
            setSuccess(true)
            dispatch({ type: 'UPDATE_DAILY', payload: json })
        }
    }

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

            setTitle(json.title)
            setDesc(json.desc)

            if(response.ok) {
                setLoading(false)
                dispatch({ type: 'GET_SINGLE_DAILY', payload: json })
            }
        }

        fetchDaily()
    }, [dispatch, user])

    return (
        <section id="edit-page" className="container my-5">
            <div className="card bg-base-100 shadow-xl w-full mx-auto lg:p-0 p-5">
                <div className="card-body">
                    { loading && <div>Bentar...</div> }    
                    { !loading && <form onSubmit={handleSubmit}>

                    {error &&
                        <div className="alert alert-error shadow-lg mb-5">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{error}</span>
                            </div>
                        </div>
                    }

                    { success &&
                        <div className="toast">
                            <div className="alert alert-info">
                                <div>
                                    <span>Data Berhasil Ditambahkan</span>
                                </div>
                            </div>
                        </div>
                    }

                        <h3 className="text-center text-3xl mb-5 font-bold">Edit</h3>

                        <div className="form-control mb-3">
                            <label className="input-group input-group-sm">
                                <span>Title</span>
                                <input type="text" placeholder="ngapain..." className="input input-bordered w-full" onChange={(e) => setTitle(e.target.value)} value={title} />
                            </label>
                        </div>

                        <div className="form-control mb-3">
                            <textarea className="textarea textarea-primary" placeholder="deskripsi..." onChange={(e) => setDesc(e.target.value)} value={desc}></textarea>
                        </div>

                        <div className="mt-5">
                            <button className="btn btn-primary">Submit</button>
                            <Link className="btn btn-error mx-3" to="/">Kembali</Link>
                        </div>

                    </form> }
                </div>
            </div>
        </section>
    );
}
 
export default Edit;