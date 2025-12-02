import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from '../components/Signin'
import ProtectedRoute from '../components/ProtectedRoute'
import Home from '../components/Home'
import Signup from '../components/Signup'
import EmailVerification from '../components/EmailAuth'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/signin' element={<Signin />} />
        <Route path='/email/auth' element={<EmailVerification />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App