import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { formatDate, getAPI, postApi, putApi } from '../service/Service'

const EnrolmentForm = (props) => {

    const [stuData, setStuData] = useState({
        dob: new Date(),
        date_enroll: new Date(),
    })
    const [errors, setErrors] = useState({})




    const handleDate = (date, name) => {
        let fieldName = name;
        let fleldVal = new Date(date);
        setStuData({ ...stuData, [fieldName]: fleldVal });
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setStuData({
            ...stuData,
            [name]: value
        })

    };

    const handleSubmit = () => {
        if (handleValidation()) {
            let reqData = stuData;
            reqData["dob"] = formatDate(reqData.dob)
            reqData["date_enroll"] = formatDate(reqData.date_enroll)

            if (props.match.params.id !== undefined) {
                reqData["id"] = props.match.params.id;

                putApi(`data/${props.match.params.id}`, reqData).then(res => {
                    console.log(res)
                    window.location.replace("/");
                })
            } else {
                postApi(`data`, reqData).then(res => {
                    console.log(res)
                    window.location.replace("/");
                })
            }

        }
    };

    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;

        if (!stuData['student_name']) {
            formIsValid = false;

            errors['student_name'] = 'This is a mandatory field.';
        }
        if (!stuData['father_name']) {
            formIsValid = false;

            errors['father_name'] = 'This is a mandatory field.';
        }


        if (!stuData['dob']) {
            formIsValid = false;

            errors['dob'] = 'This is a mandatory field.';
        }
        if (!stuData['state']) {
            formIsValid = false;

            errors['state'] = 'This is a mandatory field.';
        }
        if (!stuData['city']) {
            formIsValid = false;

            errors['city'] = 'This is a mandatory field.';
        }
        if (!stuData['pin']) {
            formIsValid = false;

            errors['pin'] = 'This is a mandatory field.';
        }
        if (!stuData['phone']) {
            formIsValid = false;

            errors['phone'] = 'This is a mandatory field.';
        }

        if (!stuData['email']) {
            formIsValid = false;

            errors['email'] = 'This is a mandatory field.';
        }
        if (!stuData['class']) {
            formIsValid = false;

            errors['class'] = 'This is a mandatory field.';
        }
        if (!stuData['date_enroll']) {
            formIsValid = false;

            errors['date_enroll'] = 'This is a mandatory field.';
        }
        setErrors(errors);
        return formIsValid;
    }


    const getDataById = () => {
        if (props.match.params != undefined || props.match.params != '') {
            if (props.match.params.id !== undefined) {
                getAPI(`data/${props.match.params.id}`).then(res => {
                    // console.log(res);
                    res.dob = res["dob"] = new Date(res.dob)
                    res.date_enroll = res["date_enroll"] = new Date(res.date_enroll)
                    setStuData(res)
                    console.log(stuData)
                })
            }
        }
    }

    useEffect(() => {
        getDataById();
    }, [])





    return (
        <>
            <Container>
                <Row className="mt-3">
                    <Col md="8" className="mx-auto box">
                        <h4 className="mb-3">Please Fill the Details</h4>
                        <Form>
                            <Row>
                                <Col md="6">
                                    <Form.Group className={
                                        errors['student_name'] ? 'errorshow mb-3' : 'errorshide mb-3'
                                    } >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            onChange={handleChange}
                                            type="text"
                                            name="student_name"
                                            value={stuData.student_name}
                                            placeholder="Enter Your Name"
                                        />
                                        <span
                                            className={
                                                errors['student_name'] ? 'errorshow' : 'errorshide'
                                            }
                                        >
                                            {errors['student_name']}
                                        </span>
                                    </Form.Group>
                                    <Form.Group
                                        className={
                                            errors['father_name'] ? 'errorshow mb-3' : 'errorshide mb-3'
                                        } >
                                        <Form.Label>Father's Name</Form.Label>
                                        <Form.Control
                                            onChange={handleChange}
                                            type="text"
                                            name="father_name"
                                            value={stuData.father_name}
                                            placeholder="Father's Name" />
                                        <span
                                            className={
                                                errors['father_name'] ? 'errorshow' : 'errorshide'
                                            }
                                        >
                                            {errors['father_name']}
                                        </span>
                                    </Form.Group>


                                    <Form.Group className={
                                        errors['email'] ? 'errorshow mb-3' : 'errorshide mb-3'
                                    } >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control onChange={handleChange}
                                            name="email"
                                            value={stuData.email}
                                            type="email"
                                            placeholder="Enter email" />
                                        <span
                                            className={
                                                errors['email'] ? 'errorshow' : 'errorshide'
                                            }
                                        >
                                            {errors['email']}
                                        </span>
                                    </Form.Group>
                                    <Form.Group className={
                                        errors['phone'] ? 'errorshow mb-3' : 'errorshide mb-3'
                                    }>
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control onChange={handleChange}
                                            name="phone"
                                            value={stuData.phone}
                                            type="text"
                                            placeholder="Phone" />
                                        <span
                                            className={
                                                errors['phone'] ? 'errorshow' : 'errorshide'
                                            }
                                        >
                                            {errors['phone']}
                                        </span>
                                    </Form.Group>

                                    <Form.Group className={
                                        errors['marks'] ? 'errorshow mb-3' : 'errorshide mb-3'
                                    }>
                                        <Form.Label>Marks %</Form.Label>
                                        <Form.Control onChange={handleChange}
                                            name="marks"
                                            value={stuData.marks}
                                            type="text"
                                            placeholder="marks" />
                                        <span
                                            className={
                                                errors['marks'] ? 'errorshow' : 'errorshide'
                                            }
                                        >
                                            {errors['marks']}
                                        </span>
                                    </Form.Group>
                                    <Form.Group className={
                                        errors['class'] ? 'errorshow mb-3' : 'errorshide mb-3'
                                    }>
                                        <Form.Label>Select Class</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="class"
                                            value={stuData.class}
                                            onChange={handleChange}
                                        >
                                            <option defaultValue>Select Class</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>

                                        </Form.Control>
                                        <span
                                            className={
                                                errors['class'] ? 'errorshow' : 'errorshide'
                                            }
                                        >
                                            {errors['class']}
                                        </span>
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className={
                                        errors['state'] ? 'errorshow mb-3' : 'errorshide mb-3'
                                    }>
                                        <Form.Label>State</Form.Label>
                                        <Form.Control onChange={handleChange}
                                            name="state"
                                            value={stuData.state}
                                            type="text"
                                            placeholder="State" />
                                        <span
                                            className={
                                                errors['state'] ? 'errorshow' : 'errorshide'
                                            }
                                        >
                                            {errors['state']}
                                        </span>
                                    </Form.Group>
                                    <Form.Group className={
                                        errors['city'] ? 'errorshow mb-3' : 'errorshide mb-3'
                                    }>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control onChange={handleChange}
                                            name="city"
                                            value={stuData.city}
                                            type="text"
                                            placeholder="City" />
                                        <span
                                            className={
                                                errors['city'] ? 'errorshow' : 'errorshide'
                                            }
                                        >
                                            {errors['city']}
                                        </span>
                                    </Form.Group>
                                    <Form.Group className={
                                        errors['pin'] ? 'errorshow mb-3' : 'errorshide mb-3'
                                    }>
                                        <Form.Label>PIN Code</Form.Label>
                                        <Form.Control onChange={handleChange}
                                            name="pin"
                                            value={stuData.pin}
                                            type="text"
                                            placeholder="Pin code" />
                                        <span
                                            className={
                                                errors['pin'] ? 'errorshow' : 'errorshide'
                                            }
                                        >
                                            {errors['pin']}
                                        </span>
                                    </Form.Group>
                                    <Form.Group className={
                                        errors['date_enroll'] ? 'errorshow mb-3' : 'errorshide mb-3'
                                    }>
                                        <Form.Label>Enroll Date</Form.Label> <br />
                                        <DatePicker
                                            selected={stuData.date_enroll}
                                            className="calendar default_input"
                                            dateFormat='dd-MM-yyyy'
                                            name="date_enroll"
                                            value={stuData.date_enroll}
                                            autoComplete="off"
                                            onChange={(date) => handleDate(date, 'date_enroll')}
                                        />
                                    </Form.Group>


                                    <Form.Group className={
                                        errors['dob'] ? 'errorshow mb-3' : 'errorshide mb-3'
                                    }>
                                        <Form.Label>DOB</Form.Label> <br />
                                        <DatePicker
                                            selected={stuData.dob}
                                            className="calendar default_input"
                                            dateFormat='dd-MM-yyyy'
                                            name="dob"
                                            value={stuData.dob}
                                            autoComplete="off"
                                            onChange={(date) => handleDate(date, 'dob')}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button className="addBtn float" onClick={handleSubmit} type="button">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EnrolmentForm


