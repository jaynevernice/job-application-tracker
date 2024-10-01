import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import LogoutButton from '../components/LogoutButton';
import Spinner from '../components/Spinner';

import { FaUser, FaBuilding, FaLocationDot, FaBuffer, FaLink, FaCalendarDays, FaCalendarPlus, FaBarsProgress, FaMoneyBills, FaHashtag, FaRegNoteSticky, FaRegRectangleList, FaFloppyDisk } from "react-icons/fa6";
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';


const ShowJob = () => {

  const [job, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {

    if (!user) {
      navigate('/');
      return;
    }

    console.log('Current user in ShowJob', user);
    setLoading(true);

    axios
      .get(`http://localhost:5555/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
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

  return (
    <div className='bg-background flex min-h-screen p-12'>
      <div className='bg-background min-w-full rounded-3xl px-10 py-4 shadow-neumorphic'>

        <div className='flex items-center justify-between w-full h-20'>
          <h1 className='text-4xl font-mono font-bold text-primary'>Application Details</h1>

          <div className="flex items-center">
            {user &&
              <button disabled="disabled" className='mx-1 bg-background rounded-full p-3 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-300 group'>
                <span className="group-hover:inline-block text-primary font-bold transition-opacity duration-300">
                  {user.fname.toUpperCase()} {user.lname.toUpperCase()}
                </span>
              </button>
            }
            <BackButton />
            <LogoutButton />
          </div>
        </div>

        <div className='mt-4 relative overflow-x-auto'>
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
                      {/* <span className='text-xs'>{job.jobLink}</span> */}
                      <a
                        href={job.jobLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-secondary hover:underline hover:text-blue-600"
                      >
                        {job.jobLink}
                      </a>
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
        </div>

      </div>
    </div>
  )
}

export default ShowJob