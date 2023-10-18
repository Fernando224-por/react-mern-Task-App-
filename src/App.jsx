import { BrowserRouter, Routes, Route } from 'react-router-dom'  
import RegisterPage from './pages/registerPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import { AuthProvider } from './context/authContext.jsx'
import HomePage from './pages/homePage.jsx'
import TaskFormPage from './pages/TaskFormPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import TaskPage from './pages/TaskPage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import NavBar from './components/NavBar.jsx'
function App () {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <main className="container content-container mx-auto px-10 md:px-0">
          <NavBar/>
          <Routes>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/login' element={<LoginPage/>}></Route>
                <Route path='/register' element={<RegisterPage/>}></Route>

                <Route element={<ProtectedRoute/>}>
                    <Route path='/tasks' element={<TaskPage/>}></Route>
                    <Route path='/add-task' element={<TaskFormPage/>}></Route>
                    <Route path='/task/:id' element={<TaskFormPage/>}></Route>
                    <Route path='/profile' element={<ProfilePage/>}></Route>
                </Route>
          </Routes>
        </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  ) 
}

export default App