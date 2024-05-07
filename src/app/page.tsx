import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between w-screen'>
      <div className='flex flex-col justify-center'>
        <Navbar />
        <div className='flex mt-24'>
          <div className='flex flex-col items-center mx-16 mt-10 space-y-8'>
            <h1 className='text-7xl font-semibold text-[#223549]'>Learn to play piano with ease.</h1>
            <p className='text-2xl text-[#223549]'>KeySight is a platform that generates quality step-by-step piano tutorials for any piano audio of your choosing.</p>
            <div className='flex w-full items-center space-x-10 mx-10'>
              <a className='bg-black text-white px-8 py-3 rounded-xl hover:scale-[1.04] transition' href='/register'>
                Register now
              </a>
              <a href='/about' className='text-[#223549] font-bold'>Learn More</a>
            </div>
          </div>
          <img className='w-[55%] border-2 border-black rounded-md border-r-0' src='/demo.png' alt='Piano' />
        </div>
      </div>
    </main>
  )
}
