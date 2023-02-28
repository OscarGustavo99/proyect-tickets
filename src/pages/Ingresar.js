import React, { useState } from 'react'
import { Button, Divider, Form, Input, InputNumber, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

const { Title, Text } = Typography;

export const Ingresar = () => {
    // METODO DE MOSTRAR MENU
    useHideMenu(false)


    // UseNavigate HOOK para navegar
    const navigate = useNavigate()

    // useState
    const [usuario] = useState(getUsuarioStorage())
    console.log(usuario)

    // 
    const onFinish = ({ agente, escritorio }) => {
        // console.log('Success:', values);
        localStorage.setItem('agente', agente)
        localStorage.setItem('escritorio', escritorio)

        //
        navigate('/escritorio', {
            replace: true
        })
    };

    //
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (usuario?.agente && usuario?.escritorio) {
        return <Navigate to="/escritorio" />;
    }


    return (
        <>
            <Title lever={2}>Ingresar</Title>
            <Text>Ingrese su nombre y número de escritorio</Text>
            <Divider />


            <Form
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 15,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="Nombre del agente"
                    name="agente"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese su nombre!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Escritorio"
                    name="escritorio"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese el número de escritorio',
                        },
                    ]}
                >
                    <InputNumber min={1} max={99} />
                </Form.Item>



                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 15,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape="round"
                    >

                        <SaveOutlined />
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </>

    );
}
