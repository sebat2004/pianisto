export default function Navbar() {
    return (
        <nav className='flex justify-between w-screen items-center px-6 sm:px-16 py-3 xs:py-4 shadow-lg'>
            <div className='flex items-center space-x-4'>
                <div className='flex items-center'>
                    <a href='/' className='text-xl xs:text-2xl font-bold text-[#2477B4]'>
                        Key
                    </a>
                    <a href='/' className='text-xl xs:text-2xl font-bold text-black'>
                        Sight
                    </a>
                </div>
            </div>
            <div className='flex items-center space-x-6'>
                <a className='text-sm xs:text-md' href='/login'>
                    Login
                </a>
                <a
                    className='bg-black text-white text-sm p-2 xs:p-3 xs:text-md rounded-xl hover:scale-[1.04] transition'
                    href='/register'
                >
                    Register
                </a>
            </div>
        </nav>
    )
}
