import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import './GroupManagement.css'; // Import your main CSS file

const FinancialDashboard = () => {
    const [groups, setGroups] = useState([]); // State to store groups data
    const { username } = useParams(); // Get username from URL params

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
                    <button aria-label="Settings" className="settings-button">Settings</button>
                </div>
            </nav>
            <button className="group-button">Group Finance Management</button>
            <main>
                <div className="group-list">
                    {/* Map over the groups array to render each group as a panel */}
                    {groups.map((group) => (
                        <div key={group._id} className="group-item">
                            <h3>{group.name}</h3>
                            <p>Group Balance: ${group.balance}</p>
                            {/* Add other group details as needed */}
                        </div>
                    ))}
                </div>
            </main>
            <footer className="footer-section">
                <button className="history-button">History</button>
            </footer>
            <nav className="navigation">
                <button className="back-button">Back</button>
            </nav>
        </div>
    );
};

export default FinancialDashboard;

