import React from 'react'
import { Provider } from 'react-redux'
import { SocketProvider } from './context/SocketContext'
import { UiProvider } from './context/UiContext'
// Router
import { RouterPage } from './pages/RouterPage'
import { store } from './store/store'

export const TicketApp = () => {
    return (
    <SocketProvider>
        <UiProvider>
            <Provider store={store}>
                <RouterPage />
            </Provider>
        </UiProvider>
     </SocketProvider>
    )
}
