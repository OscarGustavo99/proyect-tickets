import React, { useContext, useEffect, useState } from "react"
import { useHideMenu } from "../hooks/useHideMenu"
import { SocketContext } from '../context/UiContext'
import { Divider, Typography } from "antd"
import { useNavigate } from 'react-router-dom'

import {animateScroll as scroll} from 'react-scroll'

import axios from "axios"
import { CardContent, Collapse, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, } from "@mui/material"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';

import { ExpandMore, KeyboardArrowRight } from "@mui/icons-material"

const { Title, Text } = Typography

export const Formulario = () => {

    useHideMenu(true)

    const { validando, factura, recibirFactura } = useContext(SocketContext) /// DATA
    // console.log(factura)

    const [form, setForm] = useState({
        fecha: '',
        folio: '',
        timbreFiscal: '',
        nombreEmisor: '',
        rfcEmisor: '',
        regimenFiscalEmisor: '',
        nombreReceptor: '',
        rfcReceptor: '',
        usoCFDI_Receptor: '',
        subtotal: '',
        conceptos: [],
        impuesto: '',
        total: '',
        uuidaFac: ''

    })
    const history = useNavigate()

    // ** CAMBIAR TRUE
    const [open, setOpen] = useState(false)
    const [oper, setOper] = useState(false)

    const [abrirCampo,setAbrirCampo] = useState(false)

    useEffect(()=>{
        if(open){
            setAbrirCampo(true)
        } else{
            setAbrirCampo(false)
        }

    },[open])

    const handleClick2 = () => {
        setOper(!oper)
    }
    const handleClick = () => {
        setOpen(!open)
    }

    // console.log(form)
 
    useEffect(() => {

        // Obtienes la Data
        if (validando) {
            setForm((form) => ({
                ...form,
                fecha: factura?.Fecha,
                folio: factura?.Folio,
                nombreEmisor: factura?.Emisor?.Nombre,
                rfcEmisor: factura?.Emisor?.RFC,
                regimenFiscalEmisor: factura?.Emisor?.RegimenFiscal,
                nombreReceptor: factura?.Receptor?.Nombre,
                rfcReceptor: factura?.Receptor?.RFC,
                usoCFDI_Receptor: factura?.Receptor?.UsoCFDI,
                subtotal: factura?.Subtotal,
                conceptos: factura?.Conceptos,
                total: factura?.Total,
                uuidaFac: factura?.TimbreFiscalDigital?.UUID
            }))
        }
    }, [validando, factura])


    // ** Cambias el target Inputs
    const onChange = ({ target }) => {
        const { name, value } = target
        setForm({
            ...form,
            [name]: value
        })
    }

    const todoOk = () => {
        setForm((form) => ({
            ...form,
            fecha: '',
            folio: '',
            timbreFiscal: '',
            nombreEmisor: '',
            rfcEmisor: '',
            regimenFiscalEmisor: '',
            nombreReceptor: '',
            rfcReceptor: '',
            usoCFDI_Receptor: '',
            conceptos: [],
            subtotal: '',
            impuesto: '',
            total: '',
            uuidaFac: ''
        }))
        // Vacia el estado "Padre"
        recibirFactura('')
        // Regresamos a la ruta anterior
        history('/crear')
        
        scroll.scrollToTop();
    }

    const todoForm = ()=>{
        return (form?.folio) ? true: false
    }

    const onSubmit = async (ev) => {
        ev.preventDefault()
        console.log(form)

        setForm((form) => ({
            ...form,
            fecha: '',
            folio: '',
            timbreFiscal: '',
            nombreEmisor: '',
            rfcEmisor: '',
            regimenFiscalEmisor: '',
            nombreReceptor: '',
            rfcReceptor: '',
            usoCFDI_Receptor: '',
            conceptos: [],
            subtotal: '',
            impuesto: '',
            total: '',
            uuidaFac: ''
        }))

        const config = {
            headers: {
                // 'Accept': 'application/json'
                'Content-Type': 'multipart/form-data'
            }
        }

        try {
            const formData = new FormData()

            const key = "f9c54ed6-d851-4772-9e9d-7bd75da75467"
            const folio = form.uuidaFac

            formData.append('folio_fiscal', form?.uuidaFac)
            formData.append('emisor_nombre', form?.nombreEmisor)
            formData.append('emisor_rfc', form?.rfcEmisor)
            formData.append('emisor_regimen_fiscal', form?.regimenFiscalEmisor)
            formData.append('receptor_nombre', form?.nombreReceptor)
            formData.append('receptor_rfc', form?.rfcReceptor)
            formData.append('receptor_uso_cfdi', form?.usoCFDI_Receptor)
            formData.append('fecha', form?.fecha)
            formData.append('folio', form?.folio)
            formData.append('subtotal', form?.subtotal)
            formData.append('total', form?.total)
            formData.append('magic-key', key)

            const res = await axios.post(`https://dolphin-app-2p6gu.ondigitalocean.app/cfdi?magic-key=${key}&folio_fiscal=${folio}`, formData, config)


            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="container">
                <Title lever={2}>Factura</Title>
                <Divider />

                <form
                    onSubmit={onSubmit}
                >
                    {/* Vista Fecha, Folio y Timbre Fiscal */}
                    <Grid container spacing={2} justifyContent="center" alignItems="center" pb={5}>

                        <Grid item xs={12} sm={8} md="auto" lg={4}>
                            <Box border={2} borderRadius={2} p={2}>
                                <Grid container >
                                    <List component="nav">
                                        <ListItem disablePadding>
                                            <CardContent>
                                                <Title level={3}>Fecha: </Title>
                                            </CardContent>

                                            <CardContent>
                                                <TextField
                                                    error={false}
                                                    label="Fecha"
                                                    type="text"
                                                    name="fecha"
                                                    margin="dense"
                                                    variant="outlined"
                                                    disabled
                                                    color="success"
                                                    value={form.fecha}
                                                    onChange={onChange}

                                                />
                                            </CardContent>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Box>

                        </Grid>

                        <Grid item xs={12} sm={8} md lg={4}>
                            <Box border={2} borderRadius={2} p={2}>
                                <Grid container spacing={0}>
                                    <List component="nav">
                                        <ListItem disablePadding>
                                            <CardContent>
                                                <Title level={3}>Folio: </Title>
                                            </CardContent>

                                            <CardContent>
                                                <TextField
                                                    error={false}
                                                    label="Folio"
                                                    type="text"
                                                    name="folio"
                                                    disabled
                                                    margin="dense"
                                                    variant="outlined"
                                                    color="success"
                                                    value={form.folio}
                                                    onChange={onChange}
                                                />
                                            </CardContent>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Box>

                        </Grid>

                        <Grid item xs={12} sm={8} md lg={4}>
                            <Box border={2} borderRadius={2} p={2}>
                                <Grid >
                                    <List component="nav">
                                        <ListItem disablePadding>
                                            <CardContent>
                                                <Title level={3}>Timbre Fiscal: </Title>
                                            </CardContent>
                                            <TextField
                                                margin="dense"
                                                pt={0}
                                                error={false}
                                                disabled
                                                label="Timbre Fiscal: "
                                                type="text"
                                                name="uuidaFac"
                                                variant="outlined"
                                                fullWidth
                                                color="success"
                                                value={form.uuidaFac}
                                                onChange={onChange}

                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Box>

                        </Grid>

                    </Grid>

                    {/* Vista Emisor y Receptor */}
                    <Grid container spacing={2} pb={2}>

                        <Grid item xs={12} sm={12} md={6} lg={6} >
                            <Box border={3} p={2}>
                                <Title level={3}>Emisor</Title>
                                <Divider />

                                <CardContent >
                                    <div className="row h6">
                                        <Box my={0}>
                                            <Grid container direction="row" spacing={2}>
                                                <Text>Nombre: </Text>
                                                <TextField
                                                    error={false}
                                                    label="Nombre del emisor"
                                                    type="text"
                                                    name="nombreEmisor"
                                                    disabled
                                                    margin="dense"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                    value={form.nombreEmisor}
                                                    onChange={onChange}
                                                />
                                            </Grid>
                                        </Box>
                                    </div>
                                </CardContent>

                                <CardContent>
                                    <div className="h6">
                                        <Box my={0}>
                                            <Grid container direction="row" spacing={2}>
                                                <Text>RFC: </Text>
                                                <TextField
                                                    error={false}
                                                    disabled
                                                    label="RFC del Emisor"
                                                    type="text"
                                                    name="rfcEmisor"
                                                    margin="dense"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                    value={form.rfcEmisor}
                                                    onChange={onChange}
                                                />
                                            </Grid>
                                        </Box>
                                    </div>
                                </CardContent>

                                <CardContent>
                                    <div className="h6">
                                        <Box my={0}>
                                            <Grid container direction="row" spacing={2}>
                                                <Text>Regimen Fiscal: </Text>
                                                <TextField
                                                    error={false}
                                                    disabled
                                                    label="RFC del Emisor"
                                                    type="text"
                                                    name="regimenFiscalEmisor"
                                                    margin="dense"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                    value={form.regimenFiscalEmisor}
                                                    onChange={onChange}
                                                />
                                            </Grid>
                                        </Box>
                                    </div>
                                </CardContent>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Box border={3} p={2}>
                                <Title level={3}>Receptor</Title>
                                <Divider />

                                <CardContent >
                                    <div className="row h6">
                                        <Box my={0}>
                                            <Grid container direction="row" spacing={2}>
                                                <Text>Nombre: </Text>
                                                <TextField
                                                    error={false}
                                                    disabled
                                                    label="Nombre del Receptor"
                                                    type="text"
                                                    name="nombreReceptor"
                                                    margin="dense"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                    value={form.nombreReceptor}
                                                    onChange={onChange}
                                                />
                                            </Grid>
                                        </Box>
                                    </div>
                                </CardContent>

                                <CardContent >
                                    <div className="row h6">
                                        <Box my={0}>
                                            <Grid container direction="row" spacing={2}>
                                                <Text>RFC: </Text>
                                                <TextField
                                                    error={false}
                                                    disabled
                                                    label="RFC del Receptor"
                                                    type="text"
                                                    name="rfcReceptor"
                                                    margin="dense"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                    value={form.rfcReceptor}
                                                    onChange={onChange}
                                                />
                                            </Grid>
                                        </Box>
                                    </div>
                                </CardContent>

                                <CardContent >
                                    <div className="row h6">
                                        <Box my={0}>
                                            <Grid container direction="row" spacing={2}>
                                                <Text>Uso CFDI: </Text>
                                                <TextField
                                                    error={false}
                                                    disabled
                                                    label="CFDI"
                                                    type="text"
                                                    name="usoCFDI_Receptor"
                                                    margin="dense"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                    value={form.usoCFDI_Receptor}
                                                    onChange={onChange}
                                                />
                                            </Grid>
                                        </Box>
                                    </div>
                                </CardContent>
                            </Box>
                        </Grid>

                    </Grid>

                    <Divider />

                    {/* Vista conceptos */}
                    <Grid container spacing={1} pb={2}>
                        <div className="col-12">
                            {
                                // Array.isArray(form.conceptos)
                                //     ? <h2>Es un array</h2>
                                //     : <h2>No un array</h2>
                            }
                            <CardContent >
                                <div className="row ">
                                    <Box border={3} p={2}>
                                        <Title level={3}>Conceptos: </Title>
                                        <Divider />
                                        <List component="nav">

                                            <ListItemButton onClick={handleClick2}>
                                                {oper ? <ExpandMore /> : <KeyboardArrowRight />}

                                                <ListItemText
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                1 &nbsp;
                                                            </Typography>

                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                Materiales de construcción para vivi....
                                                            </Typography>

                                                        </>
                                                    }
                                                />
                                            </ListItemButton>

                                            <Collapse in={oper} timeout="auto" unmountOnExit>
                                                <List disablePadding>
                                                </List>
                                            </Collapse>


                                            <ListItemButton onClick={handleClick}>
                                                {abrirCampo ? <ExpandMore /> : <KeyboardArrowRight />}

                                                <ListItemText
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                2 &nbsp;
                                                            </Typography>

                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                Fabricación de piezzas segun mues...
                                                            </Typography>

                                                        </>
                                                    }
                                                />

                                            </ListItemButton>

                                            <Collapse in={abrirCampo} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {/* **TODO: TABLAS */}
                                                    <TableContainer component={Paper} sx={{ pl: 3, height: 256 }}>

                                                        <Table sx={{ minWidth: 650 }} >

                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Cantidad</TableCell>
                                                                    <TableCell>Descripción</TableCell>
                                                                    <TableCell>Valor Unitario</TableCell>
                                                                    <TableCell>Importe</TableCell>
                                                                </TableRow>
                                                            </TableHead>

                                                            <TableBody >
                                                                {form?.conceptos?.map((row, index) => (
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
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </List>
                                            </Collapse>
                                        </List>
                                    </Box>
                                </div>
                            </CardContent>
                        </div>

                    </Grid>

                    {/* Vista Subtotal,impuesto y Total*/}
                    <div className="row">
                        <Grid container spacing={2} justifyContent="flex-end" pb={5}>
                            <Grid item xs={12} sm={8} md={8} lg={5} >
                            </Grid>

                            <Grid item xs={12} sm={12} md={8} lg={5} >
                                <Box border={3} p={2}>
                                    <Grid container direction="column" alignItems="flex-end">
                                        <List >
                                            <ListItem disablePadding alignItems="center">
                                                <CardContent>
                                                    <Title level={3}>Subtotal: </Title>
                                                </CardContent>

                                                <CardContent >
                                                    <div className="row h6">
                                                        <Box my={0}>
                                                            <Grid container direction="row" spacing={2}>

                                                                <TextField
                                                                    error={false}
                                                                    disabled
                                                                    label="Subtotal"
                                                                    type="number"
                                                                    name="subtotal"
                                                                    margin="dense"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    color="success"
                                                                    value={form.subtotal}
                                                                    onChange={onChange}
                                                                />
                                                            </Grid>
                                                        </Box>
                                                    </div>
                                                </CardContent>

                                            </ListItem>
                                        </List>

                                        <List >
                                            <ListItem disablePadding alignItems="center">
                                                <CardContent>
                                                    <Title level={3}>Impuesto: </Title>
                                                </CardContent>

                                                <CardContent >
                                                    <div className="row h6">
                                                        <Box my={0}>
                                                            <Grid container direction="row" spacing={2}>

                                                                <TextField
                                                                    error={false}
                                                                    disabled
                                                                    label="Impuesto"
                                                                    type="text"
                                                                    name="impuesto"
                                                                    margin="dense"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    color="success"
                                                                    value={form.impuesto}
                                                                    onChange={onChange}
                                                                />
                                                            </Grid>
                                                        </Box>
                                                    </div>
                                                </CardContent>

                                            </ListItem>
                                        </List>

                                        <List >
                                            <ListItem disablePadding alignItems="center">
                                                <CardContent>
                                                    <Title level={3}>Total: </Title>
                                                </CardContent>

                                                <CardContent >
                                                    <div className="row h6">
                                                        <Box my={0}>
                                                            <Grid container direction="row" spacing={2}>

                                                                <TextField
                                                                    error={false}
                                                                    label="Total"
                                                                    type="number"
                                                                    name="total"
                                                                    margin="dense"
                                                                    disabled
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    color="success"
                                                                    value={form.total}
                                                                    onChange={onChange}
                                                                />
                                                            </Grid>
                                                        </Box>
                                                    </div>
                                                </CardContent>

                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Box>
                            </Grid>

                        </Grid>
                    </div>

                    <div className="row">
                        <Grid container spacing={2} justifyContent="flex-end" pb={5}>
                            <Grid item xs={12} sm={8} md={8} lg={5} >
                            </Grid>

                            <Grid item xs={12} sm={12} md={8} lg={5} >
                                <Box  p={2}>
                                    <Grid container direction="column" alignItems="flex-end">
                                        <List >
                                            <ListItem disablePadding alignItems="center">
                                                <Grid container spacing={8}>
                                                    <Grid item xs={6}>
                                                         <Button
                                                            component="label"
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={() => todoOk()}
                                                        >
                                                            Regresar
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs>
                                                        <button
                                                            className="btn btn-outline-success"
                                                            type="submit"
                                                            disabled={!todoForm()}
                                                        >
                                                            Enviar
                                                        </button>
                                                    </Grid>
                                                </Grid>

                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Box>
                            </Grid>

                        </Grid>
                    </div>
                </form>
            </div>
        </>
    )
}
