
export const getUltimos = async () => {
    try {
        const url = await fetch('https://proyecto-ticket-server-production.up.railway.app/ultimos')
        const resultado = await url.json()
        // console.log(resultado.ultimos)

        const { ultimos } = resultado

        return ultimos

    } catch (error) {
        console.log(error)
    }

}