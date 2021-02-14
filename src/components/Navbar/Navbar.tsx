import React from "react";
import { contentPadding } from '../../theme/theme'
import { Link } from "react-router-dom"

export const Navbar : React.FC = () => {
    return <div className={ `${contentPadding} w-full h-20   bg-uanlBlue  flex justify-between items-center` }>
        <div>
            <h1 className="text-white text-lg">Título de la página</h1>
        </div>
        <div className="">
            <NavbarLink content="Home" to="/" />
        </div>
    </div>
} 

type NavbarLinkProps = {
    to: string
    content: string
}

const NavbarLink : React.FC<NavbarLinkProps> = ({ to, content }) => {
    return <Link children={content} to={to} className="text-gray-200 hover:text-white transition-colors duration-100" />
}

