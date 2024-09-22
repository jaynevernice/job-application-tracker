import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useAuthContext } from '../hooks/useAuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div>
            <h2 className="text-3xl font-mono font-semibold text-center text-primary mb-6">
                TRACK YOUR JOB APPLICATIONS
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium font-mono text-primary">
                        Email
                    </label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        value={email}
                        className="bg-gray-50 border text-primary text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 transition duration-150 ease-in-out shadow-neumorphic-input"
                        placeholder="sample@email.com"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium font-mono text-primary">
                        Password
                    </label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        value={password}
                        className="bg-gray-50 border text-primary text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 transition duration-150 ease-in-out shadow-neumorphic-input"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <div className="flex items-center justify-center mt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`bg-background text-primary font-semibold font-mono py-2 px-4 rounded-lg shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-300 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'LOGGING IN...' : 'LOGIN'}
                    </button>
                </div>

                {error && <div className='bg-red-200 p-2 my-2 rounded-lg'>{error}</div>}
            </form>
        </div>
    );
};

export default Login;
