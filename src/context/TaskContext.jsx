import { createContext, useContext, useState } from "react";
import { createTasksRequest, getTasksRequest, deleteTasksRequest, getTaskRequest, updateTasksRequest } from "../api/task";
const TaskContext = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTask must be used within a TaskProvider")
    }
    return context;
}

// eslint-disable-next-line react/prop-types
export function  TaskProvider ({children}) {
    
    // eslint-disable-next-line no-unused-vars
    const [tasks, SetTasks] = useState([
    ])
    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            SetTasks(res.data)
        } catch (error) {
            console.error(error)
        }
    }
    const createTask = async (task) => {
        const res = await createTasksRequest(task)
        console.log(res)
    }
    const deleteTask = async (id) => {
        try {
            const res = await deleteTasksRequest(id)
            if (res.status === 204) SetTasks(tasks.filter((task) => task._id !== id))
        } catch (err) {
            console.error(err)
        }
    }
    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data;
        } catch (err) {
            console.error(err)
        }
    }
    const updateTask  = async (id, task) => {
        try {
            await updateTasksRequest (id, task);
        } catch (err) {
            console.error(err)
        }
    }
    return(
        <TaskContext.Provider 
        value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}