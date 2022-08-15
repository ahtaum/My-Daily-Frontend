import './edit.css'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useDailyContext } from '../hooks/useDailyContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Edit = () => {

    const { dispatch } = useDailyContext()
    const { user } = useAuthContext()
    const { id } = useParams()

    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [stress_point, setStress_point] = useState(null)
    const [error, setError] = useState(null)
    const [emptyField, setEmptyField] = useState([])
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('Anda Harus Login')
            return
        }

        const daily = {title, desc, stress_point}

        const response = await fetch(`/api/my-daily/update-daily/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(daily),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': `Bearer ${user.token}`
            }
          })
        const json = await response.json()

        if(!response.ok) {
            setError(response.error)
            setEmptyField(response.emptyField)
        }
        if(response.ok) {
            setEmptyField([])
            setError(null)
            setTitle(null)
            setDesc(null)
            setStress_point(null)
            setSuccess(true)
            dispatch({ type: 'UPDATE_DAILY', payload: json })
        }
    }

    return (
        <section id="edit-page" className="container my-5">
            <div className="card bg-base-100 shadow-xl w-full mx-auto lg:p-0 p-5">
                <div className="card-body">        
                    <form onSubmit={handleSubmit}>

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
                            <label className="input-group input-group-sm">
                                <span>Stress</span>
                                <input type="number" placeholder="ngapain..." className="input input-bordered w-full" onChange={(e) => setStress_point(e.target.value)} value={stress_point} />
                            </label>
                        </div>

                        <div className="form-control mb-3">
                            <textarea className="textarea textarea-primary" placeholder="deskripsi..." onChange={(e) => setDesc(e.target.value)} value={desc}></textarea>
                        </div>

                        <div className="mt-5">
                            <button className="btn btn-primary">OK</button>
                            <Link className="btn btn-error mx-3" to="/">Kembali</Link>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
}
 
export default Edit;