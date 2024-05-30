import Link from 'next/link'

export default function MainNavbar() {
    return (
        <nav className='flex w-screen items-center justify-between px-16 py-4 shadow-lg'>
            <div className='flex items-center space-x-4'>
                <div className='flex items-center'>
                    <Link href='/' className='text-3xl font-bold text-[#2477B4]'>
                        Key
                    </Link>
                    <Link href='/' className='text-3xl font-bold text-black'>
                        Sight
                    </Link>
                </div>
            </div>
            <div className='flex items-center space-x-8'>
                <Link href='/home/practice' className='text-black'>
                    Practice
                </Link>
                <Link href='/' className='text-black'>
                    Logout
                </Link>
            </div>
        </nav>
    )
}
