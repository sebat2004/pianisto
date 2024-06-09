'use client'
import Navbar from '../components/Navbar'
import useWidth from '@/hooks/useWidth'
import Image from 'next/image'

export default function Home() {
    const width = useWidth()
    return (
        <main className='flex min-h-screen w-screen flex-col items-center justify-between'>
            <div className='flex flex-col items-center justify-center'>
                <Navbar />
                <div className='flex flex-col items-center sm:mt-2'>
                    <div className='mt-14 flex flex-col items-center space-y-8 px-8 sm:gap-1'>
                        <h1 className='text-center text-4xl font-semibold text-[#223549] sm:text-5xl'>
                            Generate piano tutorials <br /> for any song.
                        </h1>
                        <p className='text-center text-lg text-[#374f6a] xs:text-xl'>
                            KeySight is a platform that generates quality step-by-step{' '}
                            {width > 800 ? <br /> : undefined} piano tutorials for any piano audio
                            of your choosing.
                        </p>
                        <a
                            className='rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:scale-[1.04] sm:px-14'
                            href='/register'
                        >
                            Start Learning Now
                        </a>
                    </div>
                    <Image
                        className='border-r-3 mt-10 w-[95%] rounded-xl border-2 border-black md:w-[90%]'
                        src='/demo.svg'
                        alt='Piano'
                        width={500}
                        height={200}
                    />
                </div>
            </div>
        </main>
    )
}
