'use client'

import HomeNavbar from '@/components/HomeNavbar'
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'

const DeleteModal = ({ transcriptionId, handleModalYes, handleModalNo }: any) => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 flex justify-center items-center'>
            <div className='bg-white p-10 rounded-lg'>
                <p>Are you sure you want to delete this transcription?</p>
                <div className='flex justify-center items-center gap-5 mt-5'>
                    <button
                        onClick={handleModalYes}
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Yes
                    </button>
                    <button
                        onClick={handleModalNo}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
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
            <div className='flex flex-col justify-center items-center text-center mt-14 px-20'>
                <div className='flex justify-between items-center w-[100%]'>
                    <p className='self-start text-3xl font-semibold'>Transcriptions</p>
                    {Object.keys(lastDeletedTranscription).length > 0 ? (
                        <button
                            className='bg-black text-white p-3 rounded-xl hover:scale-[1.04] transition'
                            onClick={handleUndo}
                        >
                            Undo Last Delete
                        </button>
                    ) : null}
                </div>
                <div className='flex flex-col justify-center items-center my-14 gap-5 w-[100%] shadow-xl bg-[#ffffff] rounded-lg'>
                    {transcriptions.map((transcription) => (
                        <div
                            key={transcription.id}
                            className='flex flex-col justify-center items-center gap-3 w-[100%]'
                        >
                            <div className='flex justify-center items-center w-[50%] py-10 rounded-lg mt-10 gap-6'>
                                <p className='text-2xl font-semibold'>{transcription.title}</p>
                                <p>Date Added: {transcription.dateAdded}</p>
                                <Link
                                    href='/home/practice/play'
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                >
                                    Play
                                </Link>
                                <button
                                    onClick={() => {
                                        setShowModal(true)
                                        setCurrentModalId(transcription.id)
                                    }}
                                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
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
