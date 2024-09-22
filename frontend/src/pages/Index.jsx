import React, { useState, useEffect } from 'react';
import illustImage from '../assets/illust.jpg';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';

const Index = ({ isLogin }) => {

    const {user} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    return (
        <div className='bg-background flex min-h-screen p-12'>
            <div className='bg-background min-w-full rounded-3xl px-10 py-6 shadow-neumorphic'>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 h-full ">

                    <div className='flex justify-center items-center relative'>
                        <img
                            src={illustImage}
                            className='w-full h-full rounded-2xl object-cover'
                            alt="Illustration"
                        />
                        <div className='absolute bottom-3 right-5 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm '>
                            Designed by <a href="https://www.freepik.com/free-vector/hand-drawn-business-coffee-illustration_30118587.htm#fromView=keyword&page=1&position=3&uuid=42c68c9c-23c5-4b5b-8547-4925cbfa317f" target="_blank" rel="noopener noreferrer" className="underline">Freepik</a>
                        </div>
                    </div>

                    <div className="bg-background flex justify-center items-center p-6 rounded-2xl shadow-neumorphic">
                        <div className="w-full p-2 md:p-16">

                            {isLogin ? <Login /> : <Signup />}

                            <div className="mt-4 text-center">
                                {isLogin ? (
                                    <p className="text-sm text-gray-500">
                                        Don't have an account?{' '}
                                        <Link
                                            to="/signup"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Sign Up
                                        </Link>
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        Already have an account?{' '}
                                        <Link
                                            to="/login" 
                                            className="text-blue-600 hover:underline"
                                        >
                                            Log In
                                        </Link>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Index;
