
export const getUsuarioStorage = () => {
    return {
        // Obtengo los datos del localStorage del navegador
        agente: localStorage.getItem('agente'),
        escritorio: localStorage.getItem('escritorio'),
    }
}


