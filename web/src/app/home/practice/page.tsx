'use client'

import HomeNavbar from '@/components/HomeNavbar'
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import Link from 'next/link'
import React, { useEffect } from 'react'
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

const Transcriptions: React.FC = () => {
    const [transcriptions, setTranscriptions] = useState([
        {
            id: 1,
            title: 'Fur Elise',
            dateAdded: '09/10/2021'
        },
        {
            id: 2,
            title: 'Moonlight Sonata',
            dateAdded: '10/15/2021'
        },
        {
            id: 3,
            title: 'Canon in D',
            dateAdded: '11/20/2021'
        },
        {
            id: 4,
            title: 'Clair de Lune',
            dateAdded: '12/25/2021'
        },
        {
            id: 5,
            title: 'Prelude in C',
            dateAdded: '01/01/2022'
        }
    ])
    const [showModal, setShowModal] = useState(false)
    const [currentModalId, setCurrentModalId] = useState(0)
    const [lastDeletedTranscription, setLastDeletedTranscription] = useState({})

    const handleUndo = () => {
        if (Object.keys(lastDeletedTranscription).length === 0) return
        const newTranscriptions = [lastDeletedTranscription, ...transcriptions]
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
                    {transcriptions.map((transcription) => (
                        <div
                            key={transcription.id}
                            className='flex w-[100%] flex-col items-center justify-center gap-3'
                        >
                            <div className='mt-10 flex w-[50%] items-center justify-center gap-6 rounded-lg py-10'>
                                <p className='text-2xl font-semibold'>{transcription.title}</p>
                                <p>Date Added: {transcription.dateAdded}</p>
                                <Link
                                    href='/home/practice/play'
                                    className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                                >
                                    Play
                                </Link>
                                <button
                                    onClick={() => {
                                        setShowModal(true)
                                        setCurrentModalId(transcription.id)
                                    }}
                                    className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
                                >
                                    Delete
                                </button>
                                {showModal && currentModalId == transcription.id ? (
                                    <DeleteModal
                                        transcriptionId={currentModalId}
                                        handleModalYes={() => {
                                            const newTranscriptions = transcriptions.filter(
                                                (oldTranscription) =>
                                                    oldTranscription.id !== transcription.id
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
