import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [todo, setTodo] = useState("");
  const [listOfTodo, setListOfTodo] = useState([]);

  const addTodo = () => {
    Axios.post("https://mern-todo-practice.herokuapp.com/addtodo", {
      todo: todo,
    }).then((res) => {
      setListOfTodo([...listOfTodo, { _id: res.data._id, todo: todo }]);
    });
  };

  const editTodo = (id) => {
    const newTodo = prompt("Edit Task: ");

    Axios.put("https://mern-todo-practice.herokuapp.com/edit", {
      newTodo: newTodo,
      id: id,
    }).then(() => {
      setListOfTodo(
        listOfTodo.map((val) => {
          return val._id == id ? { _id: id, todo: newTodo } : val;
        })
      );
    });
  };

  const deleteTodo = (id) => {
    Axios.delete(`https://mern-todo-practice.herokuapp.com/delete/${id}`).then(
      () => {
        setListOfTodo(
          listOfTodo.filter((val) => {
            return val._id != id;
          })
        );
      }
    );
  };

  useEffect(() => {
    Axios.get("https://mern-todo-practice.herokuapp.com/read")
      .then((res) => {
        console.log(res.data);
        setListOfTodo(res.data);
      })
      .catch(() => {
        console.log("err");
      });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="New Task..."
          onChange={(event) => {
            setTodo(event.target.value);
          }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="outputs">
        {listOfTodo.map((val) => {
          return (
            <div className="outputs__container">
              <div className="outputs__todo" key={val._id}>
                <h3>{val.todo}</h3>
              </div>
              <button
                onClick={() => {
                  editTodo(val._id);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deleteTodo(val._id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
