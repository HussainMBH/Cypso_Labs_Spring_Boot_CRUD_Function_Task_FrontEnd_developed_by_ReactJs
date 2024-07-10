import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/tasks/task/${id}`);
      setTask(result.data);
    } catch (error) {
      console.error("Error loading task:", error);
    }
  };

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/tasks/update/${id}`, task);
      navigate("/view-tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const { title, description, status } = task;

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Task</h2>
      <form onSubmit={updateTask}>
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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

export default EditTask;
