'use client'
import { useRouter } from 'next/navigation'

export default function Login() {
    const router = useRouter()

    const redirect = (path: string) => {
        router.push(path)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        redirect('/home')
    }

    return (
        <main className='flex min-h-screen flex-col items-center justify-between w-screen'>
            <div className='flex flex-col justify-center'>
                <nav className='flex justify-between items-center w-screen px-16 py-5 shadow-lg'>
                    <div className='flex items-center space-x-4'>
                        <div className='flex items-center'>
                            <a href='/' className='text-3xl font-bold text-[#2477B4]'>
                                Key
                            </a>
                            <a href='/' className='text-3xl font-bold text-black'>
                                Sight
                            </a>
                        </div>
                    </div>
                </nav>
                <div className='flex justify-center mt-24'>
                    <div className='flex flex-col w-[40%] items-center space-y-8 bg-[#ffffff] shadow-2xl px-24 py-14 rounded-xl'>
                        <h1 className='text-2xl text-center font-semibold text-[#223549]'>
                            Welcome back! Enter your details to login.
                        </h1>
                        <form
                            className='flex flex-col w-full items-center space-y-4 mx-10'
                            onSubmit={handleSubmit}
                        >
                            <input
                                className='w-full p-3 border-2 border-black rounded-xl'
                                type='email'
                                placeholder='Email'
                            />
                            <input
                                className='w-full p-3 border-2 border-black rounded-xl'
                                type='password'
                                placeholder='Password'
                            />
                            <div className='flex justify-center w-[100%]'>
                                <button
                                    className='bg-black text-white p-3 w-[70%] rounded-xl hover:scale-[1.04] transition'
                                    type='submit'
                                >
                                    Click me to login!
                                </button>
                            </div>
                            <p className='pt-2'>
                                New to KeySight?{' '}
                                <a href='/register' className='text-[#223549] font-bold '>
                                    Register now
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
