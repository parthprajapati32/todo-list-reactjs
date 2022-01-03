import { Button, Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import TodoModal from "../../components/TodoModal";

const Todo = () => {
  const [todolist, setTodolist] = useState([]);

  const addTodo = (task) => {
    setTodolist([
      ...todolist,
      {
        id: Math.floor(100000 + Math.random() * 900000),
        task: task,
        completed: false,
      },
    ]);
  };

  const removeTodo = (id) => {
    const array = todolist.filter((obj) => obj.id !== id);
    setTodolist(array);
  };

  const editTodo = (taskObj) => {
    const index = todolist.findIndex((obj) => obj.id === taskObj.id);
    if (index !== -1) {
      let array = todolist;
      array[index] = taskObj;
      setTodolist([...array]);
    }
  };

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleClose = () => {
    setShow(false);
    setEdit(false);
    setEditData(null);
  };
  const handleShow = () => setShow(true);

  const handleEdit = (id) => {
    setEdit(true);
    let data = todolist.find((obj) => obj.id === id);
    console.log("data", data);
    setEditData(data);
    handleShow();
  };

  return (
    <Container>
      <Row>
        <Button onClick={() => handleShow()}>Add Todo</Button>
      </Row>
      <Row>
        {todolist && todolist.length > 0
          ? todolist.map((todo) => (
              <Container clasName="mt-5" key={todo.id}>
                <Row>
                  <Col>{todo.task && todo.task}</Col>
                  <Col>
                    <Button onClick={() => handleEdit(todo.id)}>Edit</Button>
                    <Button onClick={() => removeTodo(todo.id)}>Delete</Button>
                    <Button
                      onClick={() =>
                        editTodo({ ...todo, completed: !todo.completed })
                      }
                    >
                      {todo.completed ? "Incomplete" : "Complete"}
                    </Button>
                  </Col>
                  {console.log("TODO", todolist)}
                </Row>
              </Container>
            ))
          : "No task added yet!"}
      </Row>
      <TodoModal
        show={show}
        handleClose={handleClose}
        addTodo={addTodo}
        edit={edit}
        editData={editData}
        editTodo={editTodo}
      />
    </Container>
  );
};

export default Todo;
