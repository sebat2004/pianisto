'use client'
import Navbar from '../components/Navbar'
import useWidth from '@/hooks/useWidth'

export default function Home() {
    const width = useWidth()
    return (
        <main className='flex min-h-screen flex-col items-center justify-between w-screen'>
            <div className='flex flex-col justify-center items-center'>
                <Navbar />
                <div className='flex flex-col items-center sm:mt-2'>
                    <div className='flex flex-col items-center px-8 mt-14 space-y-8 sm:gap-1'>
                        <h1 className='text-4xl sm:text-5xl text-center font-semibold text-[#223549]'>
                            Generate piano tutorials <br /> for any song.
                        </h1>
                        <p className='text-lg text-center xs:text-xl text-[#374f6a]'>
                            KeySight is a platform that generates quality step-by-step{' '}
                            {width > 800 ? <br /> : undefined} piano tutorials for any piano audio
                            of your choosing.
                        </p>
                        <a
                            className='bg-black text-white font-semibold px-5 sm:px-14 py-3 rounded-xl hover:scale-[1.04] transition'
                            href='/register'
                        >
                            Start Learning Now
                        </a>
                    </div>
                    <img
                        className='w-[95%] md:w-[90%] border-2 border-black rounded-xl border-r-3 mt-10'
                        src='/demo.svg'
                        alt='Piano'
                    />
                </div>
            </div>
        </main>
    )
}
