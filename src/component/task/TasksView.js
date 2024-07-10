import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TaskView = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tasks/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/task/delete/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <div className="col-sm-10 py-5 px-5 offset-1 shadow">
      <h2 className="mt-5"> Task List</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <th scope="row">{task.id}</th>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <Link
                  to={`/edit-task/${task.id}`}
                  className="btn btn-outline-primary btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row mt-5">
        <div className="col-sm-2">
          <Link to="/add-task" className="btn btn-outline-success btn-lg">
            Add Task
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
