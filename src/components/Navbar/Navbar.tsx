import React from "react";
import { contentPadding } from '../../theme/theme'

export const Navbar : React.FC = () => {
    return <div className={ `${contentPadding} w-full h-20   bg-uanlBlue  flex justify-between items-center` }>
        <div>
            <h1 className="text-white text-lg">Título de la página</h1>
        </div>
        <div className="text-gray-200">
            
        </div>
    </div>
} 

