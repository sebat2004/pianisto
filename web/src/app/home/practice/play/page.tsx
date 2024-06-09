'use client'
import * as mm from '@magenta/music'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const Play = () => {
    const searchParams = useSearchParams()
    const [playing, setPlaying] = useState(false)
    const [played, setPlayed] = useState(false)
    const router = useRouter()
    const player = new mm.SoundFontPlayer(
        'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus'
    )

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                `http://localhost:3001/transcriptions/song/${searchParams.get('id')}`
            ).then((res) => res.json())
            const piano = document.getElementById('piano-roll') as HTMLDivElement
            const noteSequence = response.NoteSequence
            new mm.WaterfallSVGVisualizer(noteSequence, piano, {
                noteHeight: 50,
                pixelsPerTimeStep: 360,
                noteSpacing: 100,
                noteRGB: '37, 96, 145',
                activeNoteRGB: '55, 44, 33',
                whiteNoteWidth: 26
            })

            // const player = new mm.Player()
            // player.tone = new Tone.Synth({ volume: -6 }).toDestination()
            const player = new mm.SoundFontPlayer(
                'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus'
            )

            const waterfall = document.querySelector('.waterfall-notes-container')
            const start = document.getElementById('start')
            const stop = document.getElementById('stop')
            let interval: any
            let x = waterfall?.scrollHeight! - 450
            if (start)
                start!.addEventListener('click', () => {
                    setPlayed(true)
                    console.log('start')
                    setPlaying(true)
                    player.start(noteSequence).then(() => {
                        console.log('done')
                    })

                    setTimeout(() => {
                        let y = 17 //scroll speed
                        interval = setInterval(function () {
                            waterfall!.scroll(0, x)
                            x -= 6.08
                        }, y)
                    }, 10)
                })
            if (stop)
                stop.addEventListener('click', () => {
                    console.log('stop')
                    setPlaying(false)
                    clearInterval(interval)
                    player.stop()
                })
        })()
    })

    return (
        <div className='flex w-screen flex-col items-center justify-center'>
            <div id='piano-roll' className='h-[80vh]'></div>

            <button
                id='stop'
                className={`h-20 w-20 bg-black text-white ${playing ? null : 'hidden'}`}
            >
                Stop
            </button>
            <button
                id='start'
                className={`h-20 w-20 bg-black text-white ${playing ? 'hidden' : null}`}
            >
                Play
            </button>
        </div>
    )
}

export default Play
