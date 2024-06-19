import React, { useState, useEffect } from "react";
import "../../styles/ContractView/ContractEdit.css"
import { Button, Flex, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form'
import { DateInput } from '@mantine/dates';
import { useParams, useNavigate } from "react-router-dom";

const SchoolDataInput = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const isNew =  id !== 'create';


    const notEmpty = (value) => {
        if (value === null || value === undefined) {
            return "This field is required";
        }
        if (typeof value === 'string' && value.trim().length === 0) {
            return "This field is required";
        }
        return null;
    };

    const form = useForm({
        initialValues: data || {
            companySigner: "",
            companyName: "",
            companyRegisterCode: "",
            companyAddress: "",
            companyPhone: "",
            companyEmail: "",
            companyInstructor: "",
            companyInstructorPhone: "",
            companyInstructorEmail: "",
            studentName: "",
            studentPIN: "",
            studentAddress: "",
            studentPhone: "",
            studentEmail: "",
            validFrom: "",
            expirationDate: "",
            creationDate: new Date(),
            schoolSigner: "",
            schoolSignerPhone: "",
            schoolInstructor: "",
            schoolInstructorEmail: "",
            schoolInstructorPhone: ""
        },

        validate: {
            companySigner: notEmpty,
            companyName: notEmpty,
            companyRegisterCode: notEmpty,
            companyAddress: notEmpty,
            companyPhone: notEmpty,
            companyEmail: notEmpty,
            companyInstructor: notEmpty,
            companyInstructorPhone: notEmpty,
            companyInstructorEmail: notEmpty,
            studentName: notEmpty,
            studentPIN: notEmpty,
            studentAddress: notEmpty,
            studentPhone: notEmpty,
            studentEmail: notEmpty,
            validFrom: notEmpty,
            expirationDate: notEmpty,
            creationDate: notEmpty,
            schoolSigner: notEmpty,
            schoolSignerPhone: notEmpty,
            schoolInstructor: notEmpty,
            schoolInstructorEmail: notEmpty,
            schoolInstructorPhone: notEmpty
        },
    });

    useEffect(() => {
        if (isNew) {
            fetch(`HTTP://LOCALHOST:3000/api/contract/${id}`)
                .then(response => response.json())
                .then(data => form.setValues({
                    ...data,
                    validFrom: new Date(data.validFrom),
                    expirationDate: new Date(data.expirationDate),
                    creationDate: new Date(data.creationDate)
                }))
                .catch(error => console.error('Error:', error));
        }
    }, [id]);

    return (
        <form onSubmit={form.onSubmit(async (values) => {
            try {
                const url = 'HTTP://LOCALHOST:3000/api/contract' + (isNew ? `/${id}` : '');
                const method = isNew ? 'PUT' : 'POST';

                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                navigate('/contracts')

            } catch (error) {
                // Handle the error (this will depend on your application)
                console.error(error);
            }
        })}>
            <div className="container">
                <Flex>
                    <div className="school">
                        <div className="form-group">
                            <h1>Õpilane</h1>
                            <TextInput label="Ees- ja Perekonnanimi"  {...form.getInputProps('studentName')} />
                            <TextInput label="Aadress" {...form.getInputProps('studentAddress')} />
                            <TextInput label="Tel. num."  {...form.getInputProps('studentPhone')} />
                            <TextInput label="Email"  {...form.getInputProps('studentEmail')} />
                            <TextInput label="Isikukood" {...form.getInputProps('studentPIN')} />
                        </div>
                        <div className="form-group">
                            <h1>Kooli Juhendaja</h1>
                            <TextInput label="Ees- ja Perekonnanimi"  {...form.getInputProps('schoolInstructor')} />
                            <TextInput label="Email"  {...form.getInputProps('schoolInstructorEmail')} />
                            <TextInput label="Tel. num."  {...form.getInputProps('schoolInstructorPhone')} />
                        </div>
                    </div>
                    <div>
                        <div className="form-group">
                            <h1>Kooli Esindaja</h1>
                            <TextInput label="Ees- ja Perekonnanimi"  {...form.getInputProps('schoolSigner')} />
                            <TextInput label="Tel. num."  {...form.getInputProps('schoolSignerPhone')} />
                        </div>
                    </div>
                    {/* business */}
                    <div>
                        <div className="form-group">
                            <h1>Firma</h1>
                            <TextInput label="Firma nimi"  {...form.getInputProps('companyName')} />
                            <TextInput label="Registrikood"  {...form.getInputProps('companyRegisterCode')} />
                            <TextInput label="Aadress"  {...form.getInputProps('companyAddress')} />
                            <TextInput label="Kontaktisiku nimi"  {...form.getInputProps('companySigner')} />
                            <TextInput label="Telefon"  {...form.getInputProps('companyPhone')} />
                            <TextInput label="Email"  {...form.getInputProps('companyEmail')} />
                        </div>
                    </div>
                    <div>
                        <div className="form-group">
                            <h1>Ettevõtte Juhendaja</h1>
                            <TextInput label="Ees- ja Perekonnanimi"  {...form.getInputProps('companyInstructor')} />
                            <TextInput label="Tel. num."  {...form.getInputProps('companyInstructorPhone')} />
                            <TextInput label="Email"  {...form.getInputProps('companyInstructorEmail')} />
                        </div>
                        <div className="form-group">
                            <div>
                                <h1>Lepingu Info</h1>
                                <DateInput label="Kehtiv alates"  {...form.getInputProps('validFrom')} />
                                <DateInput label="Kehtiv kuni"  {...form.getInputProps('expirationDate')} />
                                <TextInput label="Loodud"  {...form.getInputProps('creationDate')} />
                            </div>
                        </div>
                    </div>
                </Flex>
                <div>
                    <Button type="submit" color="blue">Salvesta</Button>
                    <Button color="red" style={{ marginLeft: '20px' }} onClick={() => window.open(`http://localhost:3000/api/contract/${id}/pdf`, "_blank")}>Download as PDF</Button>
                </div>
            </div>
        </form>
    );
};

export default SchoolDataInput;