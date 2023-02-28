import { useContext, useEffect } from 'react'
import { SocketContext } from '../context/UiContext'

export const useHideMenu = (ocultar) => {

    const { showMenu, hideMenu } = useContext(SocketContext)

    useEffect(() => {

        if (ocultar) {
            hideMenu()
        } else {
            showMenu()
        }

    }, [ocultar, hideMenu, showMenu])

}


