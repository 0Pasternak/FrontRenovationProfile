import React, { useEffect, useState } from 'react'
import './styles/separator.css'

function Separator() {

    const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined });


    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        // Actualiza el estado inicial con el tamaño actual
        handleResize();

        // Limpieza al desmontar
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div>
            {windowSize.width < 800 ? (
                <svg width="100%" height="250" xmlns="http://www.w3.org/2000/svg" className='line-separator'>
                    <path d="M420,-390 Q50,150 300,80 T500,220" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" />

                </svg>

            ) : (
                <svg width="600" height="250" xmlns="http://www.w3.org/2000/svg" className='line-separator'>
                    <path d="M420,-390 Q50,150 300,80 T600,220" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                </svg>
            )}



        </div>


    )
}

Separator.propTypes = {}

export default Separator
