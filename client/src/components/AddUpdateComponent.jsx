import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AddUpdateComponent() {
  const [task, setTask] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdate = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      alert('Task Field Can Not Be Left Empty');
      return;
    }

    const todo = { task };
    try {
      if (id) {
        await axios.put(`/api/todo/${id}`, todo);
      } else {
        await axios.post('/api/todo', todo);
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`/api/todo/${id}`);
        setTask(response.data.task || '');
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    };
    if (id) fetchTodo();
  }, [id]);

  return (
    <div className="container mt-5">
      <h3 className="text-primary mb-4 text-center">
        {id ? 'Update ToDo' : 'Add ToDo'}
      </h3>
      <form onSubmit={saveOrUpdate}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter your task"
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">
                Save
              </button>
              <Link to="/" className="btn btn-danger">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddUpdateComponent;
