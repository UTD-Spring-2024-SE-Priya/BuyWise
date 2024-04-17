import React, { useState, useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom'; // Import useParams hook
import './GroupManagement.css'; // Import your main CSS file

const FinancialDashboard = () => {
    const [groups, setGroups] = useState([]); // State to store groups data
    const { username } = useParams(); // Get username from URL params
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch groups data asynchronously
        const fetchGroups = async () => {
            try {
                // Perform API call to fetch user data
                const response = await fetch(`http://localhost:5050/username/${username}`);
                const userData = await response.json();

                // Extract groups array from user data
                const { groups } = userData;

                // Set the groups state with the fetched data
                setGroups(groups);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call fetchGroups function when component mounts
        fetchGroups();
    }, [username]); // Fetch data whenever the username changes

    return (
        <div className="dashboard-container">
            <nav className="header-section">
                <div className="account-details">
                    <h1>{username}</h1>
                </div>
            </nav>
            <button className="group-button">My groups</button>
            <main>
                <div className="group-list">
                    {/* Map over the groups array to render each group as a panel */}
                    {groups.map((group) => (
                        <button key={group._id} className="group-item" onClick={() => navigate(`../home/${username}/${group._id}`)}>
                            <h3>{group.name}</h3>
                            <p>Group Balance: ${group.balance}</p>
                            <h5>Users : {group.users.replace(/,/g, ', ')}</h5>
                        </button>
                    ))}
                </div>
            </main>
            <footer className="footer-section">
                <button className="create-group-button" onClick={() => navigate(`./create`)}>Create Group</button>
            </footer>
            <nav className="navigation">
                <button className="back-button"onClick={() => navigate(-1)}>Back</button>
            </nav>
        </div>
    );
};

export default FinancialDashboard;

