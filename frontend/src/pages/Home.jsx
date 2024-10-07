import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import LogoutButton from '../components/LogoutButton';
import { Link, useNavigate } from 'react-router-dom';
import { RiAddCircleLine, RiInformation2Line, RiEditLine, RiDeleteBin5Line, RiLineChartLine, RiArrowLeftCircleLine, RiArrowRightCircleLine } from "react-icons/ri";

import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    console.log("Current user in Home:", user);
    setLoading(true);

    axios
      .get('http://localhost:5555/jobs', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setJobs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error:' + error);
        setLoading(false);
      });
  }, [user]);


  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = jobs.slice(firstItemIndex, lastItemIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <div className='bg-background flex min-h-screen p-12'>
      <div className='bg-background min-w-full h-[680px] rounded-3xl px-10 py-4 shadow-neumorphic'>

        <div className='flex items-center justify-between w-full h-20'>
          <h1 className='text-4xl font-mono font-bold text-primary'>Jobs</h1>

          <div className='flex items-center justify-center'>

            {user &&
              <button disabled="disabled" className='mx-1 bg-background rounded-full p-3 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-300 group'>
                <span className="group-hover:inline-block text-primary font-bold transition-opacity duration-300">
                  {user.fname.toUpperCase()} {user.lname.toUpperCase()}
                </span>
              </button>
            }

            <Link to={'/jobs/create'} className='mx-1 bg-background rounded-full p-3 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-300 group'>
              <RiAddCircleLine className='mr-1 text-primary' size={24} />
              <span className="hidden group-hover:inline-block text-primary font-bold transition-opacity duration-300">
                ADD JOB TO TRACK
              </span>
            </Link>

            <Link to={'/jobs/analyze'} className='mx-1 bg-background rounded-full p-3 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-300 group'>
              <RiLineChartLine className='mr-1 text-primary' size={24} />
              <span className="hidden group-hover:inline-block text-primary font-bold transition-opacity duration-300">
                ANALYZE
              </span>
            </Link>

            <LogoutButton />
          </div>


        </div>

        <div className='mt-4 relative overflow-x-auto'>
          {loading ?
            (
              <Spinner />
            ) : (
              <>
                <table className='w-full text-sm text-secondary table-auto'>
                  <thead className='text-xs text-primary uppercase bg-background'>
                    <tr>
                      <th scope='col' className='px-6 py-3'>#</th>
                      <th scope='col' className='px-6 py-3'>Position</th>
                      <th scope='col' className='px-6 py-3'>Company</th>
                      <th scope='col' className='px-6 py-3'>Location</th>
                      <th scope='col' className='px-6 py-3'>Platform</th>
                      <th scope='col' className='px-6 py-3'>Date Applied</th>
                      <th scope='col' className='px-6 py-3'>Status</th>
                      <th scope='col' className='px-6 py-3'>Salary</th>
                      <th scope='col' className='px-6 py-3'>Notes</th>
                      <th scope='col' className='px-6 py-3'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((job, index) => (
                      <tr key={job._id} className='bg-background border-b rounded-lg shadow-neumorphic hover:shadow-neumorphic-inset'>
                        <td className='px-6 py-4 text-xs'>{firstItemIndex + index + 1}</td>
                        <td className='px-6 py-4 text-xs'>{job.title}</td>
                        <td className='px-6 py-4 text-xs'>{job.company}</td>
                        <td className='px-6 py-4 text-xs'>{job.location}</td>
                        <td className='px-6 py-4 text-xs'>{job.jobPlatform}</td>
                        <td className='px-6 py-4 text-xs'>
                          {new Date(job.appliedDate).toLocaleDateString('en-us', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </td>
                        <td className='px-6 py-4 text-xs'>{job.status}</td>
                        <td className='px-6 py-4 text-xs'>{job.salaryRange}</td>
                        <td className='px-6 py-4 text-xs'>{job.notes}</td>
                        <td className='px-6 py-4 text-xs flex items-center justify-center'>
                          <Link to={`/jobs/details/${job._id}`} className='mx-1 bg-background rounded-full p-2 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-300'>
                            <RiInformation2Line className='text-green-800' size={20} />
                          </Link>
                          <Link to={`/jobs/edit/${job._id}`} className='mx-1 bg-background rounded-full p-2 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-300'>
                            <RiEditLine className='text-blue-800' size={20} />
                          </Link>
                          <Link to={`/jobs/delete/${job._id}`} className='mx-1 bg-background rounded-full p-2 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-300'>
                            <RiDeleteBin5Line className='text-red-800' size={20} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center items-center my-6 p-4">
                  <button onClick={handlePrevPage} disabled={currentPage === 1} className='bg-background rounded-full p-3 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset'>
                    <RiArrowLeftCircleLine size={24} />
                  </button>
                  <span className='flex mx-4 text-primary font-bold'>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button onClick={handleNextPage} disabled={currentPage === totalPages} className='rounded-full p-3 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset'>
                    <RiArrowRightCircleLine size={24} />
                  </button>
                </div>
              </>
            )
          }
        </div>

      </div>
    </div>
  );
};

export default Home;
