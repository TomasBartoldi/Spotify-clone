import { reducerCases } from "./Constants";
import { StateContext } from "./StateProvider";

export const initialState = {
    token: null,
    playlists: [],
    userInfo: null,
    selectedPlaylistId: '1z52QtgcAn8M8koU3EDacf',
    selectedPlaylist: null,
};

const reducer = (state, action) => {
    switch(action.type){
        case reducerCases.SET_TOKEN : {
            return {
                ...state,
                token: action.token,
            };
        }
        case reducerCases.SET_PLAYLISTS: {
            return{
                ...state,
                playlists: action.playlists,

            }
        }
        case reducerCases.SET_USER: {
            return {
                ...state,
                userInfo: action.userInfo,
            }
        }
        case reducerCases.SET_PLAYLIST: {
            return{
                ...state,
                selectedPlaylist: action.selectedPlaylist,
            }
        }
        
        default:
            return state;
    }
}

export default reducer;