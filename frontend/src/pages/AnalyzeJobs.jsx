import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import LogoutButton from '../components/LogoutButton';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useAuthContext } from '../hooks/useAuthContext';
import ApexSankey from 'apexsankey';

const AnalyzeJobs = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ nodes: [], edges: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5555/jobs/analyze', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                const statusCounts = response.data.data;

                // Create nodes conditionally based on statusCounts
                const nodes = [
                    { id: 'Applied', title: 'Applied' },
                    { id: 'Interviewing', title: 'Interviewing' },
                    { id: 'Offered', title: 'Offered' },
                    { id: 'Rejected', title: 'Rejected' },
                    { id: 'Hired', title: 'Hired' },
                    { id: 'Total Jobs', title: 'Total Jobs' },
                ].filter(node => statusCounts[node.id] > 0 || node.id === 'Total Jobs'); // Keep Total Jobs always

                // Create edges conditionally based on statusCounts
                const edges = [
                    { source: 'Total Jobs', target: 'Applied', value: statusCounts.Applied || 0 },
                    { source: 'Total Jobs', target: 'Interviewing', value: statusCounts.Interviewing || 0 },
                    { source: 'Total Jobs', target: 'Offered', value: statusCounts.Offered || 0 },
                    { source: 'Total Jobs', target: 'Rejected', value: statusCounts.Rejected || 0 },
                    { source: 'Total Jobs', target: 'Hired', value: statusCounts.Hired || 0 },
                ].filter(edge => edge.value > 0); // Only keep edges with a non-zero value

                setData({ nodes, edges });
                setLoading(false);

            } catch (error) {
                console.error("Error fetching job statuses:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);


    const graphOptions = {
        nodeWidth: 20,
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: 600,
        height: 150,
        width: 400,
    };

    useEffect(() => {
        if (data.nodes.length > 0 && data.edges.length > 0) {
            const s = new ApexSankey(document.getElementById('svg-sankey'), graphOptions);
            s.render(data);
        }
    }, [data]);

    return (
        <div className='bg-background flex min-h-screen p-12'>
            <div className='bg-background min-w-full rounded-3xl px-10 py-4 shadow-neumorphic'>
                <div className='flex items-center justify-between w-full h-20'>
                    <h1 className='text-4xl font-mono font-bold text-primary'>Analyze</h1>

                    <div className='flex items-center justify-center'>
                        {user && (
                            <button disabled className='mx-1 bg-background rounded-full p-3 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-300 group'>
                                <span className="group-hover:inline-block text-primary font-bold transition-opacity duration-300">
                                    {user.fname.toUpperCase()} {user.lname.toUpperCase()}
                                </span>
                            </button>
                        )}

                        <BackButton />
                        <LogoutButton />
                    </div>
                </div>

                <div className="mt-4">
                    <div id='svg-sankey' />
                    {loading && <Spinner />}
                </div>

            </div>
        </div>
    );
};

export default AnalyzeJobs;
