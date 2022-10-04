import React from 'react'
import styled from 'styled-components'

const Login = () => {

  const handleClick = () => {

    //fc85e46555134792beb5b06bb6f460af 
    const clientId = 'ad2c8430ddce465fa48e30e5d2aeaf27';  
    const redirectUrl = 'http://localhost:3000/';
    const apiUrl = 'https://accounts.spotify.com/authorize';
    const scope = [
    'user-read-email',
    'user-read-private',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-position',
    'user-top-read',
    ];

    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;

    /* https://accounts.spotify.com/authorize?client_id=ad2c8430ddce465fa48e30e5d2aeaf27&redirect_uri=http://localhost:3000/&scope=user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-playback-position%20user-top-read%20user-read-recently-played&response_type=token&show_daialog=true */

  }

  return (
    <Container>
        <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png' alt='spotify' />
        <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  )
}

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   height: 100vh;
   width: 100vw;
   background-color: #1db954;
   gap: 5rem;
   img {
    height: 20vh;
   }
   button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: #49f585;
    font-size: 1.4rem;
    cursor: pointer;
   }
`;


export default Login;