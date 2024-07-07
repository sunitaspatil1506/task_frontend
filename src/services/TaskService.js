import axios from "axios";

const URL = "http://localhost:8080/tasks";

export const listTasks = () =>  axios.get(URL);

export const savedTask = (task) => axios.post(URL, task);

export const editTask = (taskid) => {
    return axios.get(URL + '/' + taskid);
}

export const updateDataTask = (taskid , task) =>{
    return axios.put(URL + '/' + taskid,task);
}
export const deleteTask = (taskId)=> axios.delete(URL + '/' + taskId);

// export const getTaskById = (taskId) => axios.get(`${URL}/${taskId}`);
