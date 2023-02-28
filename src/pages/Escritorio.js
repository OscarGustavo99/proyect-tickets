import React, { useContext, useState } from 'react'
import { CloseCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Typography } from 'antd'
import { getUsuarioStorage } from '../helpers/getUsuarioStorage'
import { useHideMenu } from '../hooks/useHideMenu'
import { Navigate, useNavigate } from 'react-router'
import { SocketContext } from '../context/SocketContext'


const { Title, Text } = Typography


export const Escritorio = () => {

    // METODO DE MOSTRAR MENU
    useHideMenu(false)

    // UseNavigate HOOK para navegar
    const navigate = useNavigate()

    // useState guardando datos del localStorage
    const [usuario] = useState(getUsuarioStorage())

    // UseContext para el socket
    const { socket } = useContext(SocketContext)


    const [tickets,setTickets] = useState(null)

    const salir = () => {

        // Eliminar Datos del LOCAL_STORAGE 
        localStorage.clear('agente')
        localStorage.clear('escritorio')
        // o lo podemos eliminar con localStorage.clear()

        navigate('/ingresar', {
            replace: true
        })
    }


    const siguienteTicket = () => {

        console.log('siguiente Ticket')
        console.log(usuario)

        socket.emit('siguiente-ticket-trabajar', usuario, (ticket) => {
            console.log("1:", ticket)
            setTickets(ticket)
        })
    }

    // POR LA CUAL NO TE DEJA REGRESAR A INGRESAR  
    if (!usuario?.agente || !usuario?.escritorio) {
        return <Navigate to="/ingresar" />;
    }

    return (
        <>
            <Row>
                <Col span={20}>
                    <Title level={2}>{usuario.agente}</Title>
                    <Text>Usted esta trabajando en el escritorio:</Text>
                    <Text type="success"> {usuario.escritorio} </Text>
                </Col>

                <Col span={4} align="right">
                    <Button

                        shape="round"
                        type="danger"
                        onClick={salir}
                    >
                        <CloseCircleOutlined />
                        Salir
                    </Button>

                </Col>

            </Row>

            <Divider />


            {
                tickets !== null ? (
                    <Row>
                        <Col>
                            <Text>Esta atendiendo el ticket número: </Text>
                            <Text
                                style={{ fontSize: 30 }}
                                type="danger"
                            >
                                {tickets?.numero}
                            </Text>
                        </Col>
                    </Row>
                ) : <h1>NO hay datos</h1>

            }



            <Row>
                <Col offset={18} span={6} align="right">
                    <Button
                        onClick={siguienteTicket}
                        shape="round"
                        type="primary"
                    >
                        <RightCircleOutlined />
                        Siguiente
                    </Button>
                </Col>
            </Row>

        </>
    )
}
