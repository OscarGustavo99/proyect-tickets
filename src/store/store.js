import { configureStore } from '@reduxjs/toolkit'
import { facturaSlice } from './facturas/facturasSlice'



export const store = configureStore({
  reducer: {
    factura: facturaSlice.reducer
  },
})
