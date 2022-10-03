import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'


const CurrentTrack = () => {

  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentTrack = async () => {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
         headers: {
           Authorization: 'Bearer ' + token,
           "Content-Type": 'application/json'
         }
        }
       );
       if(response.data !== ""){
        const { item } = response.data
        const currentlyPlaying = {
            id: item.id,
            name: item.name,
            artists: item.artists.map((artist)=> artist.name),
            image: item.album.images[2].url,
        }
       // console.log('esto esta sonando: ', currentlyPlaying)
       dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying})
       }
    }
    getCurrentTrack()
 }, [token, dispatch]);

 console.log('esto esta sonando: ', currentlyPlaying)

  return (
    <Container>
       {
        currentlyPlaying && (
            <div className="track">
                <div className="track__image">
                    <img src={currentlyPlaying.image} alt='currentlyplaying' />
                </div>
                <div className="track__info">
                    <h4>{currentlyPlaying.name}</h4>
                    <h6>{currentlyPlaying.artists.join(", ")}</h6>
                </div>
            </div>
        )
       }
    </Container>
  )
}

const Container = styled.div`
.track{
    display: flex;
    align-items: center;
    gap: 1rem;
    &__info{
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        h4{
            color: white; 
        }
        h6{
            color: #b3b3b3;   
        }
    }
}
`;

export default CurrentTrack