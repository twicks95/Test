import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import axiosApiInstances from "../../../utils/axios";
import moment from "moment";

export default function Master(props) {
  const [show, setShow] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState();

  useEffect(() => {
    getEmployeeList();
  }, []);

  const getEmployeeList = () => {
    axiosApiInstances
      .get("employee/list")
      .then((res) => setEmployees(res.data.data));
  };

  const handleEdit = (id) => {
    props.history.push(`/karyawan/edit/${id}`);
  };

  const handleDelete = () => {
    axiosApiInstances
      .patch(`employee/delete/${employeeId}`)
      .then(() => getEmployeeList())
      .finally(() => setShow(false));
  };

  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda ingin menghapus data ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex flex-column align-items-center">
        <h1 style={{ fontSize: "36px" }}>Master Karyawan</h1>
        <Container>
          <h3 style={{ fontSize: "18px" }}>List Karyawan</h3>
          <div className="mt-4">
            <Button onClick={() => props.history.push("/karyawan/add")}>
              Tambah
            </Button>
            <Table className="mt-2" striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Tanggala Lahir</th>
                  <th>Jabatan</th>
                  <th>NIP</th>
                  <th>Jenis Kelamin</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.NAME}</td>
                    <td>{moment(item.BIRTH_DATE).format("LL")}</td>
                    <td>{item.POSITION_NAME}</td>
                    <td>{item.NIP}</td>
                    <td>{item.GENDER_NAME}</td>
                    <td>
                      <Row>
                        <Col>
                          <Button
                            variant="light"
                            className="w-100"
                            onClick={() => handleEdit(item.ID)}
                          >
                            Edit
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="danger"
                            className="w-100"
                            onClick={() => {
                              setEmployeeId(item.ID);
                              setShow(true);
                            }}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </>
  );
}
