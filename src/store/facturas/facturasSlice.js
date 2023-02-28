import { createSlice } from '@reduxjs/toolkit';

export const facturaSlice = createSlice({
    name: 'factura',
    initialState: {
        facturas: [],
        isLoading: false
    },
    reducers: {
        starLoadingFacturas: (state, /* action */ ) => {
            state.isLoading=true
        },
        setFacturas: (state, action  ) =>{
            // console.log(state)
            // state.isLoading = false
            // state.facturas = action.payload.factura
            console.log(action)
        }
    }
});


// Action creators are generated for each case reducer function
export const { starLoadingFacturas,setFacturas } = facturaSlice.actions;