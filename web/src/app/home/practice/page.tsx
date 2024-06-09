'use client'

import { UserContext } from '@/app/providers'
import HomeNavbar from '@/components/HomeNavbar'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'

const DeleteModal = ({ transcriptionId, handleModalYes, handleModalNo }: any) => {
    return (
        <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-20'>
            <div className='rounded-lg bg-white p-10'>
                <p>Are you sure you want to delete this transcription?</p>
                <div className='mt-5 flex items-center justify-center gap-5'>
                    <button
                        onClick={handleModalYes}
                        className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
                    >
                        Yes
                    </button>
                    <button
                        onClick={handleModalNo}
                        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

interface ITranscription {
    _id: string
    name: string
    createdAt: string
    userId: string
    NoteSequence: {
        pitch: number
        startTime: number
        endTime: number
        velocity: number
    }[]
}

const Transcriptions: React.FC = () => {
    const [transcriptions, setTranscriptions] = useState<ITranscription[]>([])
    const [showModal, setShowModal] = useState(false)
    const [currentModalId, setCurrentModalId] = useState(0)
    const [lastDeletedTranscription, setLastDeletedTranscription] = useState({})
    const { userId } = useContext(UserContext)

    useEffect(() => {
        ;(async () => {
            const response = await fetch(`http://localhost:3001/transcriptions/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Allow-Control-Allow-Origin': '*'
                }
            })
                .then((res) => res.json())
                .then((data) => setTranscriptions(data))
                .catch((err) => console.error(err))
            console.log(response)
        })()
    }, [userId])

    const handleUndo = () => {
        if (Object.keys(lastDeletedTranscription).length === 0) return
        const newTranscriptions = [lastDeletedTranscription, ...transcriptions] as ITranscription[]
        setTranscriptions(newTranscriptions)
        setLastDeletedTranscription({})
    }

    return (
        <>
            <HomeNavbar />
            <div className='mt-14 flex flex-col items-center justify-center px-20 text-center'>
                <div className='flex w-[100%] items-center justify-between'>
                    <p className='self-start text-3xl font-semibold'>Transcriptions</p>
                    {Object.keys(lastDeletedTranscription).length > 0 ? (
                        <button
                            className='rounded-xl bg-black p-3 text-white transition hover:scale-[1.04]'
                            onClick={handleUndo}
                        >
                            Undo Last Delete
                        </button>
                    ) : null}
                </div>
                <div className='my-14 flex w-[100%] flex-col items-center justify-center gap-5 rounded-lg bg-[#ffffff] shadow-xl'>
                    {transcriptions.map((transcription, idx) => (
                        <div
                            key={idx}
                            className='flex w-[100%] flex-col items-center justify-center gap-3'
                        >
                            <div className='mt-10 flex w-[50%] items-center justify-center gap-6 rounded-lg py-10'>
                                <p className='text-2xl font-semibold'>{transcription.name}</p>
                                <p>Date Added: {transcription.createdAt}</p>
                                <Link
                                    href={`/home/practice/play/?id=${transcription._id}`}
                                    className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                                >
                                    Play
                                </Link>
                                <button
                                    onClick={() => {
                                        setShowModal(true)
                                        setCurrentModalId(idx)
                                    }}
                                    className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
                                >
                                    Delete
                                </button>
                                {showModal && currentModalId == idx ? (
                                    <DeleteModal
                                        transcriptionId={currentModalId}
                                        handleModalYes={() => {
                                            const newTranscriptions = transcriptions.filter(
                                                (oldTranscription) =>
                                                    oldTranscription.name !== transcription.name
                                            )
                                            setLastDeletedTranscription(transcription)
                                            setTranscriptions(newTranscriptions)
                                            setShowModal(false)
                                        }}
                                        handleModalNo={() => {
                                            setShowModal(false)
                                        }}
                                    />
                                ) : null}
                            </div>
                            <hr className='w-[90%]' />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Transcriptions
