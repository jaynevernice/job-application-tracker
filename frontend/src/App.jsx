import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home.jsx'
import CreateJobs from './pages/CreateJobs.jsx'
import ShowBook from './pages/ShowJob.jsx'
import EditBook from './pages/EditJob.jsx'
import DeleteJob from './pages/DeleteJob.jsx'
import Index from './pages/Index.jsx'
import AnalyzeJobs from './pages/AnalyzeJobs.jsx';

import { AuthContextProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Index isLogin={true} />} />
        <Route path="/login" element={<Index isLogin={true} />} />
        <Route path="/signup" element={<Index isLogin={false} />} />
        <Route path='/home' element={<Home />} />
        <Route path='/jobs/create' element={<CreateJobs />} />
        <Route path='/jobs/analyze' element={<AnalyzeJobs />} />
        <Route path='/jobs/details/:id' element={<ShowBook />} />
        <Route path='/jobs/edit/:id' element={<EditBook />} />
        <Route path='/jobs/delete/:id' element={<DeleteJob />} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App