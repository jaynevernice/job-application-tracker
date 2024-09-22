import React from 'react'
import { Link } from 'react-router-dom'
import { RiLogoutBoxLine } from "react-icons/ri";
import { useLogout } from '../hooks/useLogout';


const LogoutButton = () => {

    const {logout} = useLogout();

    const handleLogout = () => {
        logout();
    }

    return (
        <div>
            <Link onClick={handleLogout} to={'/'} className='mx-1 bg-background rounded-full p-3 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-300 group'>
                <RiLogoutBoxLine className='mr-1 text-primary' size={24} />
                <span className="hidden group-hover:inline-block text-primary font-bold transition-opacity duration-300">
                    LOGOUT
                </span>
            </Link>
        </div>
    )
}

export default LogoutButton