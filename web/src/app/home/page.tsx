'use client'

import HomeNavbar from '@/components/HomeNavbar'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { OnsetsAndFrames } from '@magenta/music'
import { UserContext } from '../providers'
import React, { useContext, useState } from 'react'

const CHECKPOINT_URL =
    'https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni'

const Home: React.FC = () => {
    const router = useRouter()
    const { userId, userEmail } = useContext(UserContext)
    const [ytUrl, setYtUrl] = useState('')

    const handleUploadClick = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'audio/*'
        input.onchange = handleUpload
        input.click()
    }

    const handleUpload = (e: any) => {
        const file = e.target.files[0]
        const oafA = new OnsetsAndFrames(CHECKPOINT_URL)
        oafA.initialize()
            .then(async () => {
                const start = performance.now()
                const ns = await oafA.transcribeFromAudioFile(file)
                const body = {
                    NoteSequence: ns,
                    ytUrl: '',
                    name: file.name,
                    userId: userId
                }
                console.log(
                    'Request to Transcriptions service to add file transcription to database'
                )
                await fetch('http://localhost:3001/transcriptions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Allow-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(body)
                })
            })
            .then(() => oafA.dispose())
            .then(() => router.push('/home/practice'))
            .catch((err) => console.error(err))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Request to ytdownloader service to convert provided link to audio file')
        const file = await fetch(`http://localhost:3003/ytdownloader/?url=${ytUrl}`, {
            method: 'GET',
            headers: {
                'Response-Type': 'blob',
                'Allow-Control-Allow-Origin': '*'
            }
        }).catch((err) => console.error(err))
        if (!file) return
        const blob = await file.blob()
        const oafA = new OnsetsAndFrames(CHECKPOINT_URL)
        oafA.initialize().then(async () => {
            const start = performance.now()
            const ns = await oafA.transcribeFromAudioFile(blob)
            const b = {
                NoteSequence: ns,
                ytUrl: ytUrl,
                name: 'YouTubeVideo',
                userId: userId
            }
            console.log('Request to Transcription service to add YouTube transcription to database')
            await fetch('http://localhost:3001/transcriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Allow-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(b)
            })
                .then(() => oafA.dispose())
                .then(() => router.push('/home/practice'))
                .catch((err) => console.error(err))
        })
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
                                    <Image
                                        src='/black-upload.svg'
                                        width={50}
                                        height={50}
                                        alt='Upload'
                                    />
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
                                    name='ytUrl'
                                    onChange={(e) => setYtUrl(e.target.value)}
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
