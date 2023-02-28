import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHideMenu } from '../hooks/useHideMenu'
import { SocketContext } from '../context/UiContext';
import { Typography } from "antd"
import { useNavigate } from 'react-router-dom'
import { Box, CardContent, Grid, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import {getFacturas} from '../store/facturas/trunks'

export const CrearTicket = () => {

    const { Title } = Typography

    // METODO DE OCULTAR MENU
    useHideMenu(true)

    // USECONTEXT
    const history = useNavigate()

    const { recibirFactura } = useContext(SocketContext)

    const [archivos, setArchivos] = useState('')

    // ** FUNCION INPUT
    const subirArchivos = async (e) => {
        console.log(e[0])
        setArchivos(e[0])
    }

    useEffect(() => {
        if (archivos?.type) {
            insertarArchivos()
        }

    }, [archivos])

    // ** FUNCION BUTTON
    const insertarArchivos = async () => {

        const formData = new FormData();
        const key = "f9c54ed6-d851-4772-9e9d-7bd75da75467"

        formData.append('magic-key', key);
        formData.append('xml-file', archivos)

        console.log(formData)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'magic-key': 'f9c54ed6-d851-4772-9e9d-7bd75da75467'
                // 'Accept': 'application/json'
            }
        }

        try {

            const res = await axios.post("https://dolphin-app-2p6gu.ondigitalocean.app/cfdi/read", formData, config)
            console.log(res.data)
            //** DEVOLVER ESTADO EN USECONTEXT
            recibirFactura(res.data)
            history('/formulario')


        } catch (error) {
            console.log(error)
        }
    }

    // const makeGetRequest = async () => {
    //     try {

    //         const config = {
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'magic-key': 'f9c54ed6-d851-4772-9e9d-7bd75da75467'
    //             }
    //         }

    //         await axios.get('http://localhost:8080/cfdi',config)
    //             .then(response => {
    //                 console.log(response.data)
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             })
    //     }

    //     catch (error) {
    //         console.error(error);
    //     }
    // };

    const key = 'f9c54ed6-d851-4772-9e9d-7bd75da75467' 

    const config = {
        headers: {
            // 'Accept': 'application/json',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Access-Control-Allow-Origin': 'http://localhost:8080/cfdi',
            // 'Access-Control-Allow-Headers': 'Content-type',
            // 'Access-Control-Allow-Methods': 'GET',
            'magic-key': key                
        }
    }
    const peticionGet = async() =>{
        try {
            
             await axios.get('/cfdi',{
                headers:{
                    'magic-key': key  
                }
             })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })

                console.log()


            // const response = await fetch('http://localhost:8080/cfdi',{
            //     'mode': 'no-cors',
            //     'headers':{
            //         'Access-Control-Allow-Origin': 'http://localhost:8080/cfdi',
            //         'Access-Control-Allow-Headers': 'Content-Type',
            //         "Access-Control-Allow-Methods": "GET",
            //         'magic-key': 'f9c54ed6-d851-4772-9e9d-7bd75da75467'

            //     }
            // })
            // console.log(response)
        }

        catch (error) {
            console.log(`(http://localhost:8080/cfdi).${(config)}`)
        }
    }

    // useEffect(() => {
    //     // dispatch(getFacturas())
    //     makeGetRequest()
    // }, [])



    return (
        <>
            <div className='container'>
                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" pb={5}>
                    <div className='col-12'>
                        <CardContent>
                            <div className='row'>
                                <Box border={3} p={2}>
                                    <Title lever={2}>Buscar</Title>
                                    {/* <Divider /> */}

                                    <Grid container spacing={4} justifyContent="center" >
                                        <Grid item lg={5}>
                                            <List component="nav">
                                                <ListItem disablePadding>

                                                    <TextField
                                                        error={false}
                                                        label="Empresa"
                                                        type="text"
                                                        name="fecha"
                                                        margin="dense"
                                                        variant="outlined"
                                                        fullWidth
                                                        color="success"
                                                    // value={form.fecha}
                                                    // onChange={onChange}
                                                    />
                                                </ListItem>

                                            </List>
                                        </Grid>

                                        <Grid item lg={3}>
                                            <List component="nav">
                                                <ListItem disablePadding>

                                                    <TextField
                                                        error={false}
                                                        label="Folio Fiscal"
                                                        type="text"
                                                        name="fecha"
                                                        margin="dense"
                                                        variant="outlined"
                                                        fullWidth
                                                        color="success"
                                                    // value={form.fecha}
                                                    // onChange={onChange}

                                                    />
                                                </ListItem>

                                            </List>
                                        </Grid>
                                        <Grid item lg={3} >
                                            <List component="nav">
                                                <ListItem disablePadding>

                                                    <CardContent >
                                                        <input
                                                            type="file"
                                                            name="files"
                                                            className='form-control form-control-lg'
                                                            accept='text/xml'
                                                            onChange={(e) => subirArchivos(e.target.files)}
                                                        />

                                                    </CardContent>
                                                </ListItem>

                                            </List>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </div>

                        </CardContent>
                    </div>
                </Grid>

                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
                    <div className='col-12'>
                        <Box border={3} p={2}>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ minWidth: 650 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>

                                                <TableCell align="right" sx={{ Width: 20 }}>#</TableCell>
                                                <TableCell align="right" sx={{ minWidth: 30 }}>Fecha</TableCell>
                                                <TableCell align="right" sx={{ minWidth: 170 }}>Empresa</TableCell>
                                                <TableCell align="right" sx={{ minWidth: 170 }}>Cliente</TableCell>
                                                <TableCell align="right" sx={{ minWidth: 170 }}>Subtotal</TableCell>
                                                <TableCell align="right" sx={{ minWidth: 170 }}>Total</TableCell>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody>

                                            {/* {form?.conceptos.map((row, index) => (
                                                <TableRow
                                                    key={index}
                                                >
                                                    <TableCell scope="row">
                                                        {row.Cantidad}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">{row.Descripcion}</TableCell>
                                                    <TableCell>${row.ValorUnitario}</TableCell>
                                                    <TableCell>${row.Importe}</TableCell>

                                                </TableRow>
                                            ))} */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                /> */}
                            </Paper>
                        </Box>
                    </div>
                </Grid>

            </div>

            <button
                onClick={peticionGet}
            >
                    PRUEBAS
            </button>




            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        </>
    )
}
