'use client'

import { useRouter } from 'next/navigation'

export default function Login() {
    const router = useRouter()

    const redirect = (path: string) => {
        router.push(path)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        redirect('/login')
    }

    return (
        <main className='flex min-h-screen w-screen flex-col items-center justify-between'>
            <div className='flex flex-col justify-center'>
                <nav className='flex w-screen items-center justify-between px-16 py-5 shadow-lg'>
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
                <div className='mt-24 flex justify-center'>
                    <div className='flex w-[40%] flex-col items-center space-y-8 rounded-xl bg-[#ffffff] px-24 py-14 shadow-2xl'>
                        <h1 className='text-center text-2xl font-semibold text-[#223549]'>
                            Welcome back! Enter your details to register.
                        </h1>
                        <form
                            className='mx-10 flex w-full flex-col items-center space-y-4'
                            onSubmit={handleSubmit}
                        >
                            <input
                                className='w-full rounded-xl border-2 border-black p-3'
                                type='email'
                                placeholder='Email'
                            />
                            <input
                                className='w-full rounded-xl border-2 border-black p-3'
                                type='password'
                                placeholder='Password'
                            />
                            <button
                                className='w-[70%] rounded-xl bg-black p-3 text-white transition hover:scale-[1.04]'
                                type='submit'
                            >
                                Click me to register!
                            </button>
                            <p className='pt-2'>
                                Already have an account?{' '}
                                <a href='/login' className='font-bold text-[#223549] '>
                                    Login now
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
