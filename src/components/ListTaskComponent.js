import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteTask, listTasks } from '../services/TaskService.js';

function ListTaskComponent(){
  const navigate = useNavigate();

  const [task, setTask] = useState([])

  useEffect(() => {
      getAllTask()
  }, [])

  function getAllTask() {
      listTasks().then((response) => {
          setTask(response.data)
      }).catch(error => {
          console.error(error);
      })
  }

  function updatehandler(id) {
      navigate(`/update-task/${id}`)
  }

  function deletehandler(id) {
      deleteTask(id).then((response) => {
          getAllTask()
      }).catch(error => {
          console.error(error);
      })
  }

  return (
      <>
          <div className='container mt-4'>
          <h4 className='text-center'>ToDo List</h4>
              <table className='table table-success table-striped table-bordered table-hover'>
                  <thead>
                      <tr className='text-center'>
                          <th scope="col">Id</th>
                          <th scope="col">Title</th>
                          <th scope="col">Description</th>
                          <th scope="col">Status</th>
                          <th scope='col'>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {task.map((item,index) =>(
                              <tr> 
                                  <th scope='row' key={index}>{index +1}</th>
                                  <td>{item.todo}</td>
                                  <td>{item.description}</td>
                                  <td>{item.completed ? "Completed" :"Incomplete"}</td>
                                  <td>
                                    <button className='btn btn-sm btn-success' onClick={() => updatehandler(item.id)}>Update</button>
                                    <button className='btn mx-2 btn-sm btn-primary' onClick={() => deletehandler(item.id)}>Delete</button>
                                  </td>
                              </tr>
                    ))}
                  </tbody>
              </table>
          </div>
      </>
  )
}

export default ListTaskComponent
