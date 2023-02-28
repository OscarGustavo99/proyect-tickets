import React, { createContext, useState } from 'react'

export const SocketContext = createContext()


export const UiProvider = ({ children }) => {
    // METODO PARA OCULTAR MENU sea "true" o "false"

    const [ocultarMenu, setOcultarMenu] = useState(true)

    const [factura, setFactura ] = useState('')

    const [validando,setValidando] = useState(false)
    // console.log(factura.Fecha)

    const showMenu = () => {
        setOcultarMenu(false)
    }

    const hideMenu = () => {
        setOcultarMenu(true)
    }

    const recibirFactura = (datos) => {
        setFactura(datos)
        setValidando(true)
    }


    return (

        <SocketContext.Provider value={{validando, ocultarMenu, showMenu, hideMenu, recibirFactura, factura }}>
            {children}
        </SocketContext.Provider>
    )
}
