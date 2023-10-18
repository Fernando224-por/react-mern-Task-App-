import { useForm } from "react-hook-form"
import { useTask } from "../context/TaskContext"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import utc from 'dayjs/plugin/utc'
import dayjs from "dayjs"
dayjs.extend(utc)
function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm()
  const { createTask, getTask, updateTask } = useTask()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadTask(){
      if (params.id) {
        const task = await getTask(params.id)
        setValue('title', task.title)
        setValue('description', task.description),
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        )
      }
    }
    loadTask()
  }, [params, getTask, setValue])

  const sendData = handleSubmit((data) => {
    const validData = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    }
    if (params.id) {
      updateTask(params.id, validData)
    } else {
      createTask(validData)
    }
    navigate('/tasks')
  })
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={ sendData }>
        <label htmlFor="title">Title</label>
        <input type="text" placeholder="Title" 
        {...register('title', {require: true})}
        autoFocus
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-3"
        /> 
        <br />
        <label htmlFor="title">Description</label>
        <textarea rows="3" placeholder="Description"
        {...register('description', {required: true})}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        ></textarea> 
        <br />
        <label htmlFor="date">Date</label>
        <input type="date" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-3" name="date" {...register("date")} />
        <br />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Save</button>
      </form>
    </div>
  )
}

export default TaskFormPage