import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${import.meta.env.VITE_STUDENTAPI}` );
            const sortedUsers = response.data.sort((a, b) => a.id - b.id);
            setUsers(sortedUsers);
        };

        fetchUsers();
    }, []);

    return (
        <div>
           <ol> {users.map(user => (
                <li key={user.id}>
                    <span>{user.course} - {user.name}</span>
                    <button onClick={() => alert(`Details for user ${user.id}:\nName: ${user.name}\nEmail: ${user.email}\nCourse: ${user.course}`)}>Details</button>
                </li>
            ))}
            </ol>
        </div>
    );
};

export default UserList;