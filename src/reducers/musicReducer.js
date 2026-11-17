import musicDB from "../db/music";

export const initialState = {
    playlists: musicDB,
    playing: null,
    bannerOpen: false,
    search: null,
    language: null,
    selectedCategory: null, // New state variable to store the selected category
    selectedUsers: [], // New state for selected users
    roomName: null,
    user: null,// New state for user data
    likedSongs: JSON.parse(localStorage.getItem("likedSongs")) || {},// Add likedSongs to the initial state
    fetched: 1,
    filteredPlaylists: [] // New state for filtered playlists




};
const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PLAYLIST":
            return {
                ...state,
                playlists: action.payload
            }
        case "SET_CURR_PLAYING":
            return {
                ...state,
                playing: action.payload
            }
        case "SET_BANNER_OPEN":
            return {
                ...state,
                bannerOpen: action.payload
            };
        case "INC_TIMES_PLAYED":
            musicDB[action.payload].timesPlayed += 1;
            return state;
        case "SET_SEARCH_QUERY":
            return {
                ...state,
                search: action.payload
            };
        case "SET_MUSIC_LIST":
            return {
                ...state,
                language: action.payload
            };
        case "SET_SELECTED_CATEGORY": // Action to set the selected category
            return {
                ...state,
                selectedCategory: action.payload
            };
        case "SET_ROOM_NAME": // Action to set the selected category
            return {
                ...state,
                roomName: action.payload
            };
        case "TOGGLE_USER_SELECTION":
            const { user, roomName } = action.payload; // Remove category
            const userExists = state.selectedUsers.some(
                (selectedUser) =>
                    selectedUser.name === user.name && selectedUser.roomName === roomName
            );
            return {
                ...state,
                selectedUsers: userExists
                    ? state.selectedUsers.filter(
                        (selectedUser) =>
                            !(selectedUser.name === user.name && selectedUser.roomName === roomName)
                    )
                    : [...state.selectedUsers, { ...user, roomName }]
            };
        case "SET_USER": // Handle the new action
            return {
                ...state,
                user: action.payload
            };
        case "FETCH_AGAIN": // Handle the new action
            return {
                ...state, // Spread the existing state
                fetch: state.fetch + 1 // Increment the value of fetch by 1
            };
        case "SET_LIKE":
            const { id, isLiked } = action.payload;
            const updatedLikes = {
                ...state.likedSongs,
                [id]: isLiked
            };
            localStorage.setItem("likedSongs", JSON.stringify(updatedLikes));
            return {
                ...state,
                likedSongs: updatedLikes
            };
        case "SET_FILTERED_PLAYLISTS":
            return {
                ...state,
                filteredPlaylists: action.payload
            };
        default:
            return state;
    }
};

export default musicReducer;