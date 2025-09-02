import React from 'react';
import { useLoaderData } from 'react-router';

const UserDetail = () => {
    const user = useLoaderData();
    console.log(user);
    return (
        <div>
            <h1>User Detail Here </h1>
            <div style={{border: "1px solid red"}}>
               <h1>{user.name}</h1>
               <h2>{user.email}</h2>
            </div>
        </div>
    );
};

export default UserDetail;