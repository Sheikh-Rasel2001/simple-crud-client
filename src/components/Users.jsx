import React, { use, useState } from 'react';

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
            const addedUser = { ...addUser, _id: data.insertedId };
            const newUser = [...users, addedUser];
            setUsers(newUser);
            e.target.reset();
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
                                <p>{user.name} || {user.email}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Users;