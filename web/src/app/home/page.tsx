'use client'

import HomeNavbar from '@/components/HomeNavbar'
import { useRouter } from 'next/navigation'
import React from 'react'

const Home: React.FC = () => {
    const router = useRouter()

    const handleUploadClick = () => {
        console.log('Upload clicked')
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'audio/*'
        input.onchange = handleUpload
        input.click()
    }

    const handleUpload = (e: any) => {
        const file = e.target.files[0]
        router.push('home/transcriptions')
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push('/home/transcriptions')
    }

    return (
        <div className='h-[100vh]'>
            <HomeNavbar />
            <div className='mt-14 flex flex-col items-center justify-center text-center'>
                <div className='mt-14 flex w-[100%] items-center justify-center gap-20 px-20'>
                    <div className='flex w-[100%] flex-col items-center justify-center gap-3'>
                        <div className='mt-10 flex w-[50%] flex-col items-center justify-center gap-6 rounded-lg bg-[#ffffff] py-10 shadow-xl'>
                            <p className='text-3xl font-semibold'>Upload a new transcription.</p>
                            <button
                                className='mt-7 flex items-center justify-center rounded-lg p-10 outline-dashed outline-[3px] outline-[#304052]'
                                onClick={handleUploadClick}
                            >
                                <div className='flex items-center justify-center gap-5'>
                                    <img src='/black-upload.svg' alt='Upload' />
                                    <p className='text-black'>
                                        Upload a new transcription to practice with the app.
                                    </p>
                                </div>
                            </button>
                            <div className='flex w-[100%] items-center justify-center gap-5'>
                                <hr className='w-[40%]' />
                                <p>OR</p>
                                <hr className='w-[40%]' />
                            </div>
                            <form
                                className='mx-10 flex w-full flex-col items-center space-y-4 px-10'
                                onSubmit={handleSubmit}
                            >
                                <input
                                    className='w-full rounded-xl border-2 border-black p-3'
                                    type='text'
                                    placeholder='Enter the URL of a YouTube video'
                                />
                                <button
                                    type='submit'
                                    className='w-[40%] rounded-xl bg-black p-3 text-white transition hover:scale-[1.04]'
                                >
                                    Generate transcription
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
