import React, {useState, useContext} from 'react';
import { AuthContext } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button  from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import WallpaperArt from '../utils/WallpaperArt';
import { isMobile } from 'react-device-detect';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL;
  console.log(url);


  const handleLogin = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });
    
    if (response.ok) {
      setAuth(true);
      navigate('/');
    } else {
      alert('Login failed!');
    }
  }; 
  
  return (
    <div>
      <WallpaperArt funcs ={[
        [
          {"prob":0.25, "func": (x) => x**2, "string": (x) => `${x}**2`},
          {"prob":0.25, "func": (x) => Math.abs(Math.cos(Math.PI*2*x)), "string": (x) => `abs(cos(2pi${x}))`},
          {"prob":0.25, "func": (x) => 1/(1+Math.exp(-x + 0.5)), "string": (x) => `1/(1+exp(-${x}+0.5))`},
          {"prob":0.25, "func": (x) => 10*x - Math.floor(10*x), "string": (x) => `10${x} - floor(10${x})}`},
        ],
        [
          {"prob":0.25, "func": (x,y) => Math.sqrt(2)*Math.sqrt((x-0.5)**2+(y-0.5)**2), "string": (x,y) => `sqrt(2)*sqrt((${x}-0.5)^2+(${y}-0.5)^2)`},
          {"prob":0.25, "func": (x,y) => (x+y)/2, "string": (x,y) => `(${x}+${y})/2`},
          {"prob":0.25, "func": (x,y) => Math.abs(1-x-y), "string": (x,y) => `abs(1-${x}-${y})`},
          {"prob":0.25, "func": (x,y) => Math.max(x,y), "string": (x,y) => `max(${x}, ${y})`},
          
        ]
      ]} depth={3} max_children={2} child_prob ={0.5} />
      <Box 
        sx={isMobile
            ?
              {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: 2,
                background: 'white',
                border: '1px solid gray',
                borderRadius: '8px',
                maxWidth: '90vw',
                boxSizing: 'border-box',
                width: "auto"
              }
            : 
              {
                position: 'fixed',
                bottom: 16,
                right: 16,
                padding: 2,
                background: 'white',
                border: '1px solid gray',
                borderRadius: '8px',
              }
          }
      >
        <div>
          <Stack spacing={2} direction="column">
            <Stack spacing={2} direction="row">
              <TextField
                id="username"
                label="username"
                type = "text"
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
              <TextField
                id="password"
                label="password"
                type = "password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='new-password'
              />
            </Stack>
            <Button variant="contained" onClick={handleLogin}>Login</Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
}
export default Login