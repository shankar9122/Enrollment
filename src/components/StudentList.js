import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAPI } from '../service/Service';
import editPencil from '../images/Edit.svg'
import ReactPaginate from 'react-paginate';


const StudentList = () => {

    const [studentList, setStudentList] = useState([]);
    const [modalData, setModalData] = useState({});
    const [show, setShow] = useState(false);

    const [PageNumber, setPageNumber] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState()




    const handleClose = () => setShow(false);

    const getStudentData = () => {
        getAPI(`data`).then(res => {
            console.log(res);
            
            let page = Math.ceil(res.length /5);
            
            setPageCount(page)
            console.log(pageCount)
            const slice = res.slice(
                PageNumber,
                PageNumber + 5
            );
            setStudentList(slice);

        })
    }


    const handleStudentDetails = (data) => {
        console.log(data);
        setModalData(data)
        setShow(true)
    }


    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * 5;
        setPageNumber(offset)

        getStudentData()
    };




    useEffect(() => {
        getStudentData();
        setPageNumber(PageNumber)

    }, [])

    return (
        <>
            <Container>
                <Row>
                    <Col md="8" className="mx-auto box">
                        <h5>ENROLLMENT APP</h5>
                        <Link to="/add-student" className="addBtn float">Add Student</Link>
                        <Table striped bordered hover className="mt-5">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Student Name</th>
                                    <th>Email</th>
                                    <th>Class</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentList.map((item, index) => (
                                    <tr key={index} style={{ cursor: "pointer" }}
                                        >
                                        <td>{index + 1}</td>
                                        <td onClick={() => handleStudentDetails(item)}>{item.student_name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.class}</td>
                                        <td>
                                            <Link to={{ pathname: `update/${item.id}` }}>
                                                <img src={editPencil} alt="edit" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <div className="paginationData">
                            <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enrollment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col md="6">
                                <p>Student Name:</p>
                                <p> Father's Name:</p>
                                <p>Email:</p>
                                <p>DOB:</p>
                                <p>Phone:</p>
                                <p>Address:</p>
                                <p>Class:</p>
                                <p>Marks%:</p>
                                <p>Enroll Date:</p>
                            </Col>
                            <Col md="6">
                                <p>{modalData.student_name}</p>
                                <p>{modalData.father_name}</p>
                                <p>{modalData.email}</p>
                                <p>{modalData.dob}</p>
                                <p>{modalData.phone}</p>
                                <p>{modalData.state, modalData.city, modalData.pin}</p>
                                <p>{modalData.class}</p>
                                <p>{modalData.marks}</p>
                                <p>{modalData.date_enroll}</p>

                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default StudentList
