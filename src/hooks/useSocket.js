import { useEffect, useMemo, useState } from "react"
import io from 'socket.io-client'

export const useSocket = (serverPath) => {

    const socket = useMemo(() => io(serverPath, {
        transports: ['websocket']
    }), [serverPath])

    // Evento online
    const [online, setOnline] = useState(false)

    // Si esta conectado de entrada
    useEffect(() => {
        setOnline(socket.connected)
    }, [socket])

    // Conectando el servidor (BACK)
    useEffect(() => {
        socket.on('connect', () => {
            setOnline(true)
        })
    }, [socket])

    // Desconectando el servidor (BACK)
    useEffect(() => {
        socket.on('disconnect', () => {
            setOnline(false)
        })
    }, [socket])



    return {
        socket,
        online
    }
}


