import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react' 

function Header() {
    const router = useRouter()

    const isActive = (path) => {
        console.log(path, router.pathname)
        return router.pathname === path ? 'text-rose-200 font-extrabold' : 'text-white'
    }

    return (
        <>
            <nav className="flex sm:justify-between justify-center items-center py-4 px-8">
                <Link href="/" className='hover:no-underline'>
                    <span className={`text-white font-bold text-2xl ${isActive('/')}`}>Miggle</span>
                </Link>
                <div className="space-x-4 hidden sm:flex">
                    <NavLinks isActive={isActive} />
                </div>
            </nav>
            <div className="nav-links flex sm:hidden  justify-between px-3">
                <NavLinks isActive={isActive} />
            </div>
        </>
    )
}

const NavLinks = ({ isActive }) => {
    return (<>
        <Link href="/" className='hover:no-underline'>
            <span className={`text-white ${isActive('/welcome')}`}>Home</span>
        </Link>
        <Link href="/privacy" className='hover:no-underline'>
            <span className={`text-white ${isActive('/privacy')}`}>Privacy</span>
        </Link>
        <Link href="/about" className='hover:no-underline'>
            <span className={`text-white ${isActive('/about')}`}>About</span>
        </Link>
        <Link href="/contact" className='hover:no-underline'>
            <span className={`text-white ${isActive('/contact')}`}>Contact Us</span>
        </Link>
        <Link href="/auth/login" className='hover:no-underline'>
            <span className={`text-white ${isActive('/auth/login')}`}>Sign In</span>
        </Link>
    </>

    )
}

export default Header
