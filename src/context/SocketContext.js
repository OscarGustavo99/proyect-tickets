import React, { createContext } from 'react'
import { useSocket } from '../hooks/useSocket'

export const SocketContext = createContext()  // UTILIZA

export const SocketProvider = ({ children }) => {

    // Cusstom Hook
    const { socket, online } = useSocket('https://proyecto-ticket-server-production.up.railway.app/')

    return (

        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>

    )

}