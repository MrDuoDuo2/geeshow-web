import React, { useState } from 'react';

const handleClick = () => {
    const client_id = "17e958f53e2acd21b2b176fe443f0c5fec7610399b14a2201e05f8e132bcba19";
    
    let url = "https://gitee.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code";
    window.open('https://www.google.com',"window","popup");
};

const Login: React.FC = () => {
    return (
    <div>
        <button onClick={handleClick}>Login</button>
    </div>);
}

export default Login;