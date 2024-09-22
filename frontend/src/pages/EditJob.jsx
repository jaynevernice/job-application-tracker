import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import LogoutButton from '../components/LogoutButton'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { FaUser, FaBuilding, FaLocationDot, FaBuffer, FaLink, FaCalendarDays, FaCalendarPlus, FaBarsProgress, FaMoneyBills, FaHashtag, FaRegNoteSticky, FaRegRectangleList, FaFloppyDisk } from "react-icons/fa6";
import { useAuthContext } from '../hooks/useAuthContext'

const EditJob = () => {

  const {user} = useAuthContext();  

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [jobPlatform, setJobPlatform] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [appliedDate, setAppliedDate] = useState('');
  const [status, setStatus] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [notes, setNotes] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [nextFollowUpDate, setNextFollowUpDate] = useState('');
  const [jobIdFromPlatform, setjobIdFromPlatform] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!user) {
      navigate('/');  
      return;
    }

    console.log('Current user in EditJob', user);
    setLoading(true);

    axios
      .get(`http://localhost:5555/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setTitle(data.title || '');
        setCompany(data.company || '');
        setLocation(data.location || '');
        setJobPlatform(data.jobPlatform || '');
        setJobLink(data.jobLink || '');

        // Format Dates
        setAppliedDate(data.appliedDate ? new Date(data.appliedDate).toISOString().split('T')[0] : '');
        setNextFollowUpDate(data.nextFollowUpDate ? new Date(data.nextFollowUpDate).toISOString().split('T')[0] : '');

        setStatus(data.status || '');
        setSalaryRange(data.salaryRange || '');
        setNotes(data.notes || '');
        setJobDescription(data.jobDescription || '');
        setjobIdFromPlatform(data.jobIdFromPlatform || '');

        setLoading(false);
      })
      .catch((error) => {
        console.log('Error' + error);
        setLoading(false);
      })
  }, []);

  const handleEditJob = () => {
    if (!title || !company || !location || !jobPlatform || !jobLink || !appliedDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      title,
      company,
      location,
      jobPlatform,
      jobLink,
      appliedDate,
      status,
      salaryRange,
      notes,
      jobDescription,
      nextFollowUpDate,
      jobIdFromPlatform
    };

    setLoading(true);

    axios
      .put(`http://localhost:5555/jobs/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.log('Error: ' + error);
        setLoading(false);
      })
  }

  return (
    <div className='bg-background flex min-h-screen p-12'>
      <div className='bg-background min-w-full rounded-3xl px-10 py-4 shadow-neumorphic'>

        <div className='flex items-center justify-between w-full h-20'>
          <h1 className='text-4xl font-mono font-bold text-secondary'>Edit Application</h1>

          <div className="flex items-center">
            <BackButton />
            <LogoutButton />
          </div>

        </div>

        {loading ?
          (
            <Spinner />
          ) : (
            <div className='p-4'>
              <div className="grid grid-cols-4 gap-x-6">

                <div className='my-2'>
                  <label htmlFor="title" className='block mb-2 text-md font-medium text-primary'>Position</label>
                  <div className="flex">
                    <span className='inline-flex items-center px-3 text-md text-primary bg-gray-200 border border-e-0 border-gray-300 rounded-s-md'>
                      <FaUser />
                    </span>
                    <input type="text" id='title' value={title} onChange={(e) => setTitle(e.target.value)}
                      className='rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-primary focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-md p-2.5 shadow-neumorphic-input' />
                  </div>
                </div>

                <div className='my-2'>
                  <label htmlFor="company" className='block mb-2 text-md font-medium text-primary'>Company</label>
                  <div className="flex">
                    <span className='inline-flex items-center px-3 text-md text-primary bg-gray-200 border border-e-0 border-gray-300 rounded-s-md'>
                      <FaBuilding />
                    </span>
                    <input type="text" id='company' value={company} onChange={(e) => setCompany(e.target.value)}
                      className='rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-primary focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-md p-2.5 shadow-neumorphic-input' />
                  </div>
                </div>

                <div className='my-2'>
                  <label htmlFor="location" className='block mb-2 text-md font-medium text-primary'>Location</label>
                  <div className="flex">
                    <span className='inline-flex items-center px-3 text-md text-primary bg-gray-200 border border-e-0 border-gray-300 rounded-s-md'>
                      <FaLocationDot />
                    </span>
                    <input type="text" id='location' value={location} onChange={(e) => setLocation(e.target.value)}
                      className='rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-primary focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-md p-2.5 shadow-neumorphic-input' />
                  </div>
                </div>

                <div className='my-2'>
                  <label htmlFor="platform" className='block mb-2 text-md font-medium text-primary'>Platform</label>
                  <div className="flex">
                    <span className='inline-flex items-center px-3 text-md text-primary bg-gray-200 border border-e-0 border-gray-300 rounded-s-md'>
                      <FaBuffer />
                    </span>
                    <input type="text" id='platform' value={jobPlatform} onChange={(e) => setJobPlatform(e.target.value)}
                      className='rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-primary focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-md p-2.5 shadow-neumorphic-input' />
                  </div>
                </div>

                <div className='my-2'>
                  <label htmlFor="appliedDate" className='block mb-2 text-md font-medium text-primary'>Date Applied</label>
                  <div className="flex">
                    <span className='inline-flex items-center px-3 text-md text-primary bg-gray-200 border border-e-0 border-gray-300 rounded-s-md'>
                      <FaCalendarDays />
                    </span>
                    <input type="date" id='appliedDate' value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)}
                      className='rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-primary focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-md p-2.5 shadow-neumorphic-input' />
                  </div>
                </div>

                <div className='my-2'>
                  <label htmlFor="followUp" className='block mb-2 text-md font-medium text-primary'>Follow-Up Date</label>
                  <div className="flex">
                    <span className='inline-flex items-center px-3 text-md text-primary bg-gray-200 border border-e-0 border-gray-300 rounded-s-md'>
                      <FaCalendarPlus />
                    </span>
                    <input type='date' id='followUp' value={nextFollowUpDate} onChange={(e) => setNextFollowUpDate(e.target.value)}
                      className='rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-primary focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-md p-2.5 shadow-neumorphic-input' />
                  </div>
                </div>

                <div className='my-2'>
                  <label htmlFor="status" className='block mb-2 text-md font-medium text-primary'>Status</label>
                  <div className="flex">
                    <span className='inline-flex items-center px-3 text-md text-primary bg-gray-200 border border-e-0 border-gray-300 rounded-s-md'>
                      <FaBarsProgress />
                    </span>
                    <select
                      id='status'
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className='rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-primary focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-md p-2.5 shadow-neumorphic-input '
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offered">Offered</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Hired">Hired</option>
                    </select>
                  </div>
                </div>

                <div className='my-2'>
                  <label htmlFor="salary" className='block mb-2 text-md font-medium text-primary'>Salary</label>
                  <div className="flex">
                    <span className='inline-flex items-center px-3 text-md text-primary bg-gray-200 border border-e-0 border-gray-300 rounded-s-md'>
                      <FaMoneyBills />
                    </span>
                    <input type="text" id='salary' value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)}
                      className='rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-primary focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-md p-2.5 shadow-neumorphic-input' />
                  </div>
                </div>

                <div className='my-2'>
                  <label htmlFor="idFromPlatform" className='block mb-2 text-md font-medium text-primary'>ID from Platform</label>
                  <div className="flex">
                    <span className='inline-flex items-center px-3 text-md text-primary bg-gray-200 border border-e-0 border-gray-300 rounded-s-md'>
                      <FaHashtag />
                    </span>
                    <input type="text" id='idFromPlatform' value={jobIdFromPlatform} onChange={(e) => setjobIdFromPlatform(e.target.value)}
                      className='rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-primary focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-md p-2.5 shadow-neumorphic-input' />
                  </div>
                </div>

                <div className='my-2 col-span-3'>
                  <label htmlFor="link" className='block mb-2 text-md font-medium text-primary'>Link</label>
                  <div className="flex">
                    <span className='inline-flex items-center px-3 text-md text-primary bg-gray-200 border border-e-0 border-gray-300 rounded-s-md'>
                      <FaLink />
                    </span>
                    <input type="text" id='link' value={jobLink} onChange={(e) => setJobLink(e.target.value)}
                      className='rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-primary focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-md p-2.5 shadow-neumorphic-input' />
                  </div>
                </div>

                <div className='my-2 col-span-2'>
                  <label htmlFor="notes" className='block mb-2 text-md font-medium text-primary'>Notes</label>
                  <div className="flex">
                    <span className='inline-flex items-center px-3 text-md text-primary bg-gray-200 border border-e-0 border-gray-300 rounded-s-md'>
                      <FaRegNoteSticky />
                    </span>
                    <textarea id='notes' value={notes} onChange={(e) => setNotes(e.target.value)}
                      className='rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-primary focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-md p-2.5 shadow-neumorphic-input' />
                  </div>
                </div>

                <div className='my-2 col-span-2'>
                  <label htmlFor="description" className='block mb-2 text-md font-medium text-primary'>Description</label>
                  <div className="flex">
                    <span className='inline-flex items-center px-3 text-md text-primary bg-gray-200 border border-e-0 border-gray-300 rounded-s-md'>
                      <FaRegRectangleList />
                    </span>
                    <textarea id='description' value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                      className='rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-primary focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-md p-2.5 shadow-neumorphic-input' />
                  </div>
                </div>


              </div>

              <div className='flex items-center justify-end w-full h-20'>
                <button onClick={handleEditJob} className='bg-background rounded-full p-3 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-300 group'>
                  <FaFloppyDisk className='mr-1 text-blue-800' size={20} />
                  <span className="hidden group-hover:inline-block text-blue-800 font-bold transition-opacity duration-300">
                    UPDATE
                  </span>
                </button>
              </div>
            </div>
          )
        }

      </div>
    </div >
  )
}

export default EditJob