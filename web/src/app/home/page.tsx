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
            <div className='flex flex-col justify-center items-center text-center mt-14'>
                <div className='flex justify-center items-center mt-14 gap-20 w-[100%] px-20'>
                    <div className='flex flex-col justify-center items-center gap-3 w-[100%]'>
                        <div className='flex flex-col justify-center items-center w-[50%] py-10 rounded-lg shadow-xl mt-10 bg-[#ffffff] gap-6'>
                            <p className='text-3xl font-semibold'>Upload a new transcription.</p>
                            <button
                                className='flex justify-center items-center p-10 rounded-lg outline-dashed outline-[3px] outline-[#304052] mt-7'
                                onClick={handleUploadClick}
                            >
                                <div className='flex justify-center items-center gap-5'>
                                    <img src='/black-upload.svg' alt='Upload' />
                                    <p className='text-black'>
                                        Upload a new transcription to practice with the app.
                                    </p>
                                </div>
                            </button>
                            <div className='flex justify-center items-center gap-5 w-[100%]'>
                                <hr className='w-[40%]' />
                                <p>OR</p>
                                <hr className='w-[40%]' />
                            </div>
                            <form
                                className='flex flex-col w-full items-center space-y-4 mx-10 px-10'
                                onSubmit={handleSubmit}
                            >
                                <input
                                    className='w-full p-3 border-2 border-black rounded-xl'
                                    type='text'
                                    placeholder='Enter the URL of a YouTube video'
                                />
                                <button
                                    type='submit'
                                    className='bg-black text-white p-3 w-[40%] rounded-xl hover:scale-[1.04] transition'
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
