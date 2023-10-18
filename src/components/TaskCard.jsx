import { useTask } from "../context/TaskContext"
import { Link } from "react-router-dom"
import utc from 'dayjs/plugin/utc'
import dayjs from "dayjs"
dayjs.extend(utc)
/* eslint-disable react/prop-types */
function TaskCard({ task }) {
  const {deleteTask} = useTask()
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <header className="flex justify-between">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <div className="flex gap-x-2 items-center">
                <button onClick={() => {
                    deleteTask( task._id )
                }} className="bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-4 border border-red-700 rounded" >Delete</button>
                <Link to={`/task/${task._id}`} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 border border-yellow-700 rounded">Edit</Link>
            </div>
        </header>
        <p className="text-slate-300">{task.description}</p>
        <p>
            {
                dayjs(task.date).utc().format("DD/MM/YY")
            }
      </p>
  </div>
  )
}

export default TaskCard