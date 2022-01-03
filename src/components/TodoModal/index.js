import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";

const TodoModal = (props) => {
  const { show, handleClose, addTodo, edit, editData, editTodo } = props;

  const [task, setTask] = useState("");

  useEffect(() => {
    if (editData && edit) {
      setTask(editData.task);
    } else {
      setTask("");
    }
  }, [editData]);

  const handleSubmit = () => {
    if (edit) {
      editTodo({ ...editData, task });
    } else {
      addTodo(task);
    }
    setTask("");
    handleClose();
  };

  const closeModal = () => {
    setTask("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{edit ? "Edit Task" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {edit ? "Edit" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TodoModal;
