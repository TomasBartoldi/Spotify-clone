import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AiFillClockCircle } from 'react-icons/ai'
import {useStateProvider} from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'


const Body = () => {

  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider();
  
  useEffect(()=>{

     const getInitialPlaylist = async () => {

      console.log(selectedPlaylistId)
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, 
            {
            headers: {
              Authorization: 'Bearer ' + token,
              "Content-Type": 'application/json'
            },
          }
        );       
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith('<a') 
           ? '' 
           : response.data.description,
        image: response.data.images[2].url,
        tracks: response.data.tracks.items.map(({track}) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,

        })),
      }
      dispatch({type: reducerCases.SET_PLAYLIST, selectedPlaylist})
     };
    getInitialPlaylist();
  },[token, dispatch, selectedPlaylistId])

  return (
    <Container>
      {
        selectedPlaylist && (
          <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt='selectedplaylist' />
            </div>
            <div className="details">
              <span className='type'>PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className='description'>{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header__row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
               {
                selectedPlaylist.tracks.map(({
                  id, 
                  name, 
                  artist, 
                  image, 
                  duration, 
                  album, 
                  context_uri, 
                  track_number
                }, index)=>{
                  return (
                    <div className="row" key={id}>
                         <div className="col">
                            <span>{index+1}</span>
                         </div>
                         <div className="col detail">
                          <div className="image">
                            <img src={image} alt='track' />
                          </div>
                         <div className="info">
                             <span className="name">{name}</span>
                             <span>{artist}</span>
                         </div>                        
                        </div>
                        <div className="col">
                          <span>{album}</span>
                        </div>
                        <div className="col">
                          <span>{duration}</span>
                        </div>
                    </div>
                  )
                })
               }
            </div>
          </div>
          </>
        )
      }
    </Container>
  )
}

const Container = styled.div`
  .playlist{
    margin:0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image{
      img {
      height: 15rem;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    }
   }
   .details {
     display: flex;
     flex-direction: column;
     gap: 1rem;
     color: #e0dede;
     .title{
       color: white;
       font-size: 4rem;
     }
    }
  }
  .list {
    .header__row{
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 15vh;
      padding: 1rem 3 rem;
      transition: 0.3s ease-in-out;
    }
    .tracks{
      margin: 0.2rem;
      display: flex;
      flex-direction: column;
      margin-botton: 5rem;
      .row{
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 1.9fr 0.1fr;
        &:hover{
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
          }
        }
        .detail{
          display: flex;
          gap: 1rem;
          .info{
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }

`;

//1:40:52

export default Body