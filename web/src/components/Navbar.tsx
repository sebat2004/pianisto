export default function Navbar() {
    return (
        <nav className='flex w-screen items-center justify-between px-6 py-3 shadow-lg xs:py-4 sm:px-16'>
            <div className='flex items-center space-x-4'>
                <div className='flex items-center'>
                    <a href='/' className='text-xl font-bold text-[#2477B4] xs:text-2xl'>
                        Key
                    </a>
                    <a href='/' className='text-xl font-bold text-black xs:text-2xl'>
                        Sight
                    </a>
                </div>
            </div>
            <div className='flex items-center space-x-6'>
                <a className='xs:text-md text-sm' href='/login'>
                    Login
                </a>
                <a
                    className='xs:text-md rounded-xl bg-black p-2 text-sm text-white transition hover:scale-[1.04] xs:p-3'
                    href='/register'
                >
                    Register
                </a>
            </div>
        </nav>
    )
}
