import { useState } from 'react'
import { useDailyContext } from '../hooks/useDailyContext';
import { useAuthContext } from '../hooks/useAuthContext';

const FormCreate = () => {
    const { dispatch } = useDailyContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [stress_point, setStress_point] = useState('')
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
        
        const response = await fetch('/api/my-daily/create-daily', {
          method: 'POST',
          body: JSON.stringify(daily),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
          setEmptyField(json.emptyField)
        }
        if (response.ok) {
          setEmptyField([])
          setError(null)
          setTitle('')
          setDesc('')
          setStress_point('')
          setSuccess(true)
          dispatch({type: 'CREATE_DAILY', payload: json})
        }
    
    }

    return (
        <form onSubmit={handleSubmit} className="lg:mt-0 mt-20">

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

            <div className="form-control mb-3">
                <label className="input-group input-group-sm">
                    <span>Title</span>
                    <input type="text" placeholder="ngapain..." className={emptyField.includes('title') ? 'input input-bordered input-error' : 'input input-bordered'} onChange={(e) => setTitle(e.target.value)} value={title} />
                </label>
            </div>

            <div className="form-control mb-3">
                <label className="input-group input-group-sm">
                    <span>Stress Point</span>
                    <input type="number" placeholder="skor stress..." className={emptyField.includes('stress_point') ? 'input input-bordered input-error' : 'input input-bordered'} onChange={(e) => setStress_point(e.target.value)} value={stress_point} />
                </label>
            </div>

            <div className="form-control mb-3">
                <textarea className={emptyField.includes('title') ? 'textarea input-error' : 'textarea textarea-primary'} placeholder="deskripsi..." onChange={(e) => setDesc(e.target.value)} value={desc}></textarea>
            </div>

            <button className="btn btn-primary">OK</button>

        </form>
    );
}
 
export default FormCreate;