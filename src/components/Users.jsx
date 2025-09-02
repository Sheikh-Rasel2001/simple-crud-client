import React, { use, useState } from 'react';
import { Link } from 'react-router';

const Users = ({userPromise}) => {

    const initialUsers = use(userPromise);
    const [users, setUsers] = useState(initialUsers)


    const handleAddUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const addUser = {name, email};
        console.log(addUser)

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(addUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log('after add new user', data);
            // const addedUser = { ...addUser, _id: data.insertedId };
            addUser._id = data.insertedId; 
            const newUser = [...users, addUser];
            setUsers(newUser);
            e.target.reset();
        })
    }

    const handleUserDelete = (id) => {
        console.log('delete this user', id);
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'

        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount){
                const remainingUser = users.filter(user => user._id !== id);
                setUsers(remainingUser)
            }
            alert('delete user')
        })
    }

    return (
        <div>
            <div>
                <form onSubmit={handleAddUser}>
                    <input type="text" name='name' />
                    <br />
                    <br />
                    <input type="email" name='email'/>
                    <br />
                    <br />
                    <input type="submit" value="Add User" />
                </form>

                <div>
                    {
                        users.map(user => 
                            <div key={user._id}>
                                <p>{user.name} || {user.email}
                                <Link style={{marginRight: "20px", marginLeft: "10px"}} to={`/detail/${user._id}`}>Details</Link>
                                <Link style={{marginRight: "10px"}} to={`/update/${user._id}`}>Update</Link>
                                <button onClick={ () => handleUserDelete (user._id)}>Delete</button>
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Users;