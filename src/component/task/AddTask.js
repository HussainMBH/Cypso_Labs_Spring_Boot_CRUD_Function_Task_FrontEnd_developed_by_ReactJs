import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {
  let navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });
  const { title, description, status } = task;

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  const saveTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/task/add", task);
      navigate("/view-tasks");
    } catch (error) {
      console.error("Error saving task:", error.message);
    }
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Add Task</h2>
      <form onSubmit={(e) => saveTask(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="title">
            Title
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="description">
            Description
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="description"
            id="description"
            required
            value={description}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="status">
            Status
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="status"
            id="status"
            required
            value={status}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link
              to={"/view-tasks"}
              type="submit"
              className="btn btn-outline-warning btn-lg"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
