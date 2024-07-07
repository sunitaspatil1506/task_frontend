import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editTask, savedTask, updateDataTask } from '../services/TaskService';

function TaskComponent() {
    const [todo, setTodo] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [errors, setErrors] = useState({}); // State to hold field-specific errors
    const [backendError, setBackendError] = useState(null); // State to hold backend error message

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            editTask(id)
                .then((response) => {
                    setTodo(response.data.todo);
                    setDescription(response.data.description);
                    setCompleted(response.data.completed);
                })
                .catch(error => {
                    console.error('Error fetching task:', error);
                    // Handle error fetching task details
                });
        }
    }, [id]);

    function saveTask(e) {
        e.preventDefault();

        const task = { todo, description, completed };
        const validationErrors = validate(task);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (id) {
            updateDataTask(id, task)
                .then((response) => {
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error updating task:', error);
                    handleBackendError(error);
                });
        } else {
            savedTask(task)
                .then((response) => {
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error saving task:', error);
                    handleBackendError(error);
                });
        }
    }

    function validate(task) {
        const errors = {};
        if (!task.todo.trim()) {
            errors.todo = 'Task title is required.';
        }
        if (!task.description.trim()) {
            errors.description = 'Task description is required.';
        }
        return errors;
    }

    function handleBackendError(error) {
        if (error.response) {
            const responseData = error.response.data;
            if (responseData.message) {
                setBackendError(responseData.message); // Set backend error message
            } else {
                setBackendError("This kind of task is allready exist...");
            }
        } else {
            setBackendError('Network error. Please check your connection and try again.');
        }
    }

    function handleCancel() {
        navigate('/');
    }

    return (
        <>
            <div className='container mt-4'>
                <div className='container d-flex justify-content-center'>
                    <div className="text-center card card-top" >
                        <div className='card-head pt-2'>
                            {id ? <h4 className='title'>Update Task</h4> : <h4 className='title'>Add Task</h4>}
                        </div>
                        <div className="card-body">
                            <form action="">
                                {backendError && <div className="alert alert-danger">{backendError}</div>}
                                <div className='form-group mb-3'>
                                <div className='row'>
                                    <div className='col-4'>
                                        <label>Title</label>
                                    </div>
                                    <div className='col-8'>
                                    <input
                                        type="text"
                                        placeholder='Enter Task Title'
                                        value={todo}
                                        className={`form-control ${errors.todo ? 'is-invalid' : ''}`}
                                        onChange={(e) => {
                                            setTodo(e.target.value);
                                            setErrors({ ...errors, todo: '' }); // Clear error on change
                                            setBackendError(null); // Clear backend error on change
                                        }}
                                        required
                                    />
                                    </div>
                                    </div>
                                    {errors.todo && <div className="invalid-feedback">{errors.todo}</div>}
                                </div>
                                <div className='form-group mb-3'>
                                <div className='row'>
                                    <div className='col-4'>
                                        Description
                                    </div>
                                    <div className='col-8'>
                                    <input
                                        type="text"
                                        placeholder='Enter Task Description'
                                        value={description}
                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                            setErrors({ ...errors, description: '' }); // Clear error on change
                                            setBackendError(null); // Clear backend error on change
                                        }}
                                        required
                                    />
                                      </div>
                                      </div>
                                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                </div>
                                <div className='mb-2'>
                                    <label className="form-check-label" htmlFor="completed">Completed</label>
                                    <input
                                        type="checkbox"
                                        className="form-check-input mx-2"
                                        id="completed"
                                        name="completed"
                                        checked={completed}
                                        onChange={(e) => setCompleted(e.target.checked)}
                                    />
                                </div>
                                <button className='btn btn-sm btn-success' onClick={saveTask}>Save</button>
                                <button className='btn btn-sm btn-secondary mx-2' onClick={handleCancel}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskComponent;
