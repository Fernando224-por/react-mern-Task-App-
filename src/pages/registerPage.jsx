import { useForm } from 'react-hook-form'
import { useAuth } from '../context/authContext.jsx';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
function RegisterPage () {
    const { register, handleSubmit, formState:{
        errors
    } } = useForm()
    const { singup, isAuthenticated, errors: registerErrors } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/tasks')
        }
    }, [isAuthenticated, navigate]) 
    const sendData = handleSubmit (async (values) => {
        singup(values)
    })
    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center ">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md ">
                <h1 className="text-2xl font-bold text-center my-2">Register</h1>
                {
                    registerErrors.map((error, i) => (
                        <div key={i} className="bg-red-500 p-2 text-white">
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={ sendData }>
                    <div>
                        <input type="text" {...register('username',{ required: true, minLength:4, maxLength:150 })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder='username'
                        />
                        {
                            errors.username && (
                                <p className="text-red-500" >Username is Required</p>
                            )
                        }
                    </div>
                    
                    <div>
                        <input type="email" {...register('email',{ required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder='email'
                        />
                        {
                            errors.email && (
                                <p className="text-red-500" >Email is Required</p>
                            )
                        }                    
                    </div>

                    <div>
                    <input type="password" {...register('password', { required:true, minLength: 8 })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder='password'
                    />
                        {
                            errors.password && (
                                <p className="text-red-500">password is Required</p>
                            )
                        }                
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Register</button>
                </form>
                <p className="flex gap-x-2 justify-between ">
                        You have account? <Link to={'/login'} className="text-sky-500">Sign in</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage
