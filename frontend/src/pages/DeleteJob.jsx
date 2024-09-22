import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { FaUser, FaBuilding, FaLocationDot, FaBuffer, FaLink, FaCalendarDays, FaCalendarPlus, FaBarsProgress, FaMoneyBills, FaHashtag, FaRegNoteSticky, FaRegRectangleList, FaFloppyDisk } from "react-icons/fa6";
import { useAuthContext } from '../hooks/useAuthContext';

const DeleteJob = () => {

  const [job, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {user} = useAuthContext();

  useEffect(() => {

    if (!user) {
      navigate('/');  
      return;
    }

    console.log('Current user in DeleteJob', user);
    setLoading(true);

    axios
      .get(`http://localhost:5555/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error:' + error);
        setLoading(false);
      });

  }, [user, navigate]);

  const handleDeleteJob = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.log('Error' + error);
        setLoading(false);
      })
  }

  const handleCancelBtn = () => {
    navigate('/home');
  }

  return (
    <div className='bg-background flex min-h-screen p-12'>
      <div className='bg-background min-w-full rounded-3xl px-10 py-4 shadow-neumorphic'>

        <div className='flex items-center justify-between w-full h-20'>
          <h1 className='text-4xl font-mono font-bold text-primary'>Delete Application</h1>
        </div>

        {loading ?
          (
            <Spinner />
          ) : (
            <div className='p-4'>
              <div className="grid grid-cols-4 gap-x-6">

                <div className="my-2 bg-background rounded-lg flex items-center p-4 shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-200">
                  <FaUser className='text-3xl mr-2 text-secondary' />
                  <div>
                    <h1 className="text-md font-medium text-secondary">Position</h1>
                    <span>{job.title}</span>
                  </div>
                </div>

                <div className="my-2 bg-background rounded-lg flex items-center p-4 shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-200">
                  <FaBuilding className='text-3xl mr-2 text-secondary' />
                  <div>
                    <h1 className="text-md font-medium text-secondary">Company</h1>
                    <span>{job.company}</span>
                  </div>
                </div>

                <div className="my-2 bg-background rounded-lg flex items-center p-4 shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-200">
                  <FaLocationDot className='text-3xl mr-2 text-secondary' />
                  <div>
                    <h1 className="text-md font-medium text-secondary">Location</h1>
                    <span>{job.location}</span>
                  </div>
                </div>

                <div className="my-2 bg-background rounded-lg flex items-center p-4 shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-200">
                  <FaBuffer className='text-3xl mr-2 text-secondary' />
                  <div>
                    <h1 className="text-md font-medium text-secondary">Platform</h1>
                    <span>{job.jobPlatform}</span>
                  </div>
                </div>

                <div className="my-2 bg-background rounded-lg flex items-center p-4 shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-200">
                  <FaCalendarDays className='text-3xl mr-2 text-secondary' />
                  <div>
                    <h1 className="text-md font-medium text-secondary">Date Applied</h1>
                    <span className='text-xs'>
                      {new Date(job.appliedDate).toLocaleDateString('en-us', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="my-2 bg-background rounded-lg flex items-center p-4 shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-200">
                  <FaCalendarPlus className='text-3xl mr-2 text-secondary' />
                  <div>
                    <h1 className="text-md font-medium text-secondary">Follow-Up Date</h1>
                    <span className='text-xs'>
                      {new Date(job.nextFollowUpDate).toLocaleDateString('en-us', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="my-2 bg-background rounded-lg flex items-center p-4 shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-200">
                  <FaBarsProgress className='text-3xl mr-2 text-secondary' />
                  <div>
                    <h1 className="text-md font-medium text-secondary">Status</h1>
                    <span className='text-xs'>{job.status}</span>
                  </div>
                </div>

                <div className="my-2 bg-background rounded-lg flex items-center p-4 shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-200">
                  <FaMoneyBills className='text-3xl mr-2 text-secondary' />
                  <div>
                    <h1 className="text-md font-medium text-secondary">Salary</h1>
                    <span className='text-xs'>{job.salaryRange}</span>
                  </div>
                </div>

                <div className="my-2 bg-background rounded-lg flex items-center p-4 shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-200">
                  <FaHashtag className='text-3xl mr-2 text-secondary' />
                  <div>
                    <h1 className="text-md font-medium text-secondary">ID from Platform</h1>
                    <span className='text-xs'>{job.jobIdFromPlatform}</span>
                  </div>
                </div>

                <div className="col-span-3 my-2 bg-background rounded-lg flex items-center p-4 shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-200">
                  <FaLink className='text-3xl mr-2 text-secondary' />
                  <div>
                    <h1 className="text-md font-medium text-secondary">Link</h1>
                    <span className='text-xs'>{job.jobLink}</span>
                  </div>
                </div>

                <div className="min-h-36 col-span-2 my-2 bg-background rounded-lg flex items-center p-4 shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-200">
                  <FaRegNoteSticky className='text-3xl mr-2 text-secondary' />
                  <div>
                    <h1 className="text-md font-medium text-secondary">Notes</h1>
                    <span className='text-xs'>{job.notes}</span>
                  </div>
                </div>

                <div className="min-h-36 col-span-2 my-2 bg-background rounded-lg flex items-center p-4 shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-200">
                  <FaRegRectangleList className='text-3xl mr-2 text-secondary' />
                  <div>
                    <h1 className="text-md font-medium text-secondary">Description</h1>
                    <span className='text-xs'>{job.jobDescription}</span>
                  </div>
                </div>

              </div>

            </div>
          )
        }

        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-xs z-50 h-screen">
          <div className="bg-background rounded-3xl shadow-neuromorphic p-6 max-w-sm w-full text-center">

            <p className="mb-6 text-lg font-semibold text-secondary font-mono">Are you sure you want to delete this item?</p>

            <div className="flex justify-center space-x-4">

              <button
                type="button" onClick={handleCancelBtn}
                className="font-mono py-2 px-5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg border border-gray-300 shadow-neumorphic hover:shadow-neumorphic-inset focus:ring-4 focus:outline-none focus:ring-gray-300 transition ease-in-out duration-150"
              >
                No, Cancel
              </button>

              <button
                type="submit" onClick={handleDeleteJob}
                className="font-mono py-2 px-5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 transition ease-in-out duration-150"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default DeleteJob