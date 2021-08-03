import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import axiosApiInstances from "../../../utils/axios";

export default function Edit(props) {
  const [positionList, setPositionList] = useState([]);
  const [form, setForm] = useState({});
  const [show, setShow] = useState(false);
  const [idHasTaken, setIdHasTaken] = useState(false);
  const { id } = props.match.params;

  useEffect(() => {
    axiosApiInstances.get(`employee/${id}`).then((res) => {
      const getDate = new Date(res.data.data[0].BIRTH_DATE);
      const result = res.data.data[0];
      setForm({
        ...form,
        ...result,
        BIRTH_DATE: `${getDate.getFullYear()}-${
          getDate.getMonth().toString().length < 2
            ? `0${getDate.getMonth()}`
            : getDate.getMonth()
        }-${
          getDate.getDate().toString().length < 2
            ? `0${getDate.getDate()}`
            : getDate.getDate()
        }`,
      });
    });

    axiosApiInstances
      .get("position/list")
      .then((res) => setPositionList(res.data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axiosApiInstances
      .get(`employee?id=${form.ID_NUMBER}`)
      .then((res) => setIdHasTaken(true))
      .catch(() => setIdHasTaken(false));
  }, [form.ID_NUMBER]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleUpdateData = () => {
    axiosApiInstances
      .patch(`employee/update/${form.ID}`, form)
      .finally(() => setShow(false));
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda akan menyimpan data ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleUpdateData}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex flex-column align-items-center">
        <h1 style={{ fontSize: "36px" }}>Master Karyawan</h1>
        <Container>
          <h3 style={{ fontSize: "18px" }}>List Karyawan</h3>
          <div className="mt-4">
            <Form
              className="d-flex flex-column gap-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Row>
                <Col>
                  <label htmlFor="name">Nama</label>
                </Col>
                <Col>
                  <input
                    id="name"
                    type="text"
                    placeholder="Nama"
                    value={form.NAME}
                    onChange={(e) => setForm({ ...form, NAME: e.target.value })}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="nip">NIP</label>
                </Col>
                <Col>
                  <input
                    id="nip"
                    type="text"
                    pattern="[0-9]{8}"
                    placeholder="NIP"
                    title="Hanya angka dan harus berjumlah 8"
                    value={form.ID_NUMBER}
                    onChange={(e) =>
                      setForm({ ...form, ID_NUMBER: e.target.value })
                    }
                  />
                  {idHasTaken && (
                    <span className="ms-2 text-danger">ID sudah ada.</span>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="date">Tanggal Lahir</label>
                </Col>
                <Col>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={form.BIRTH_DATE}
                    onChange={(e) =>
                      setForm({ ...form, BIRTH_DATE: e.target.value })
                    }
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label htmlFor="jabatan">Jabatan</label>
                </Col>
                <Col>
                  <select
                    name="jabatan"
                    id="jabatan"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        POSITION_ID: parseInt(
                          e.target[e.target.selectedIndex].id
                        ),
                      })
                    }
                  >
                    <option>Select position</option>
                    {positionList.map((item, index) => (
                      <option
                        id={item.ID}
                        key={index}
                        selected={form.POSITION_ID === item.ID && true}
                      >
                        {item.NAME}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row>
                <Col>
                  <label htmlFor="kelamin">Jenis Kelamin</label>
                </Col>
                <Col className="d-flex gap-5">
                  <div>
                    <input
                      type="radio"
                      name="kelamin"
                      id="pria"
                      value="1"
                      className="me-2"
                      checked={form.GENDER === 1 && true}
                      onChange={(e) =>
                        setForm({ ...form, GENDER: parseInt(e.target.value) })
                      }
                    />
                    <label htmlFor="pria">Pria</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="kelamin"
                      id="wanita"
                      value="2"
                      className="me-2"
                      checked={form.GENDER === 2 && true}
                      onChange={(e) =>
                        setForm({ ...form, GENDER: parseInt(e.target.value) })
                      }
                    />
                    <label htmlFor="wanita">Wanita</label>
                  </div>
                </Col>
              </Row>

              <div style={{ margin: "auto" }} className="d-flex gap-4 mt-5">
                <Button variant="light" onClick={() => props.history.push("/")}>
                  Kembali
                </Button>
                <Button variant="primary" type="submit">
                  Simpan
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
}
