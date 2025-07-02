import { Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {

    const navigate = useNavigate()

    return (
        <section className='flex flex-col gap-6 items-center p-16'>
            <h1 className='text-6xl font-bold text-primary'>404</h1>
            <p className='text-xl text-gray-400'>Page not found</p>
            <button className='flex items-center gap-4' onClick={() => navigate('/boards')}>
                <Home size={24}/>
                Back to Boards
            </button>
        </section>
    )
}

export default NotFoundPage