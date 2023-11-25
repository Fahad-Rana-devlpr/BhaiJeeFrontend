import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {MDBContainer, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';

function LogIn() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogIn = async() => {
        try {
            const data = {
                username: userName,
                password : password
            }
            const response = await axios.post('http://localhost:3001/logindata',data,{
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            if(response?.data?.message === 'Success'){
              localStorage.setItem('jwt',response.data.data)
              navigate('/home')
            }else{
              setError(response?.data?.data)
              setUserName('')
              setPassword('')
            } 
        } catch (error) {
            setError(error.data)
            setUserName('')
            setPassword('')
        }
    }

  return (
    <>
    <div style={{height: '100%',width: '100%',display : 'flex',flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center'}}>
        <h1 style={{color: 'purple', fontSize: '5em', fontWeight: 'bold'}}>Bhai Jee</h1>
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow style={{display: 'flex', justifyContent: 'center'}}>
        <MDBCol col='4' md='6'>
          <MDBInput style={{border: '2px solid gray'}} value={userName} wrapperClass='mb-4' label='Username' id='formControlLg' type='txt' size="lg" onChange={(e) => setUserName(e.target.value)}/>
          <MDBInput style={{border: '2px solid gray'}} value={password} wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)}/>
          <p style={{color: 'red', fontSize: '1em'}}>{error}</p>
          <div className='text-center mt-4 pt-2'>
            <button style={{padding: '.2em 1.5em', border: 'none', backgroundColor: 'purple', color: 'white', borderRadius: '.5em', fontSize: '1.5em', cursor: 'pointer'}} onClick={handleLogIn}>Login</button>
          </div>

        </MDBCol>
      </MDBRow>
    </MDBContainer>
    
    </div>
    </>
  );
}

export default LogIn;