import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const updateUser = useLoaderData();
    console.log(updateUser);

    const handleUpdateUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const update = {name, email};
        console.log(update);

        fetch(`http://localhost:3000/users/${updateUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(update)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                alert('updated successfully', data)
            }
        })

    }

    return (
        <div>
            <h1>User Update Here</h1>
            <div>
                <form onSubmit={handleUpdateUser}>
                    <input type="text" name='name' defaultValue={updateUser.name}/>
                    <br />
                    <br />
                    <input type="email" name='email' defaultValue={updateUser.email} />
                    <br />
                    <br />
                    <input type="submit" value="Update User" />
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;