import React, { Component } from 'react'
import { Col, Container, Row, Table, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAPI } from '../service/Service';
import editPencil from '../images/Edit.svg'
import ReactPaginate from 'react-paginate';


class EnrollmentData extends Component {

    constructor(props) {
        super(props)

        this.state = {
            studentList: [],
            countedData: {},
            show: false,
            modalData: {},
            offset: 0,
            perPage: 5,
            currentPage: 0
        }
    };

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData = () => {
        const data = this.state.countedData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            studentList: slice,
        })

    }


    handleClose = () => {
        this.setState({
            show: false
        })
    };

    handleStudentShowDetails = (data) => {
        console.log(data);
        this.setState({
            modalData: data,
            show: true
        })

    }

    getStudentData = () => {
        getAPI(`data`).then(res => {

            const slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(res.length / this.state.perPage),
                studentList: slice,
                countedData: res
            })
            console.log(res);
        })
    }


    componentDidMount() {
        this.getStudentData()
    }


    render() {
        const { studentList, show, modalData } = this.state;
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
                                            <td>{item.id}</td>
                                            <td onClick={() => this.handleStudentShowDetails(item)}>{item.student_name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.class}</td>
                                            <td>
                                                <Link className="edit_btn" to={{ pathname: `update/${item.id}` }}>
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
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enrollment Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col md="4" style={{ textAlign: "right" }}>
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
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default EnrollmentData
