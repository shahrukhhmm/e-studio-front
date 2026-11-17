import axios from "axios";

const API_ENDPOINT = "http://localhost:3007"


const fetchAllUsers = async () => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/user/getAll`,
            method: "GET",
            secure: true,

        });
        return data;

    } catch (error) {
        console.log(error)
    }
}
const createRoom = async (requestData) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/chat/create`,
            method: "POST",
            secure: true,
            data: requestData

        });
        return data;

    } catch (error) {
        console.log(error)
    }
}

// dummychatID: 665828fc52cad767801f98d3

const sendMessage = async (requestData) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/chat/send-message`,
            method: "POST",
            secure: true,
            data: requestData

        });
        return data;

    } catch (error) {
        console.log(error)
    }
}


const getMeetingURL = async (groupID) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/chat/meeting?groupId=${groupID}`,
            method: "GET",
            secure: true,
        });
        return data;
    } catch (error) {
        throw error;
    }
}

const getChat = async (id) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/chat/${id}`,
            method: "GET",
            secure: true,


        });
        return data;

    } catch (error) {
        console.log(error)
    }
}
const deleteChat = async (id) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/chat/${id}`,
            method: "DELETE",
            secure: true,


        });
        return data;

    } catch (error) {
        console.log(error)
    }
}

const getGroups = async (id) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/chat/user/${id}/groups`,
            method: "GET",
            secure: true,


        });
        return data;

    } catch (error) {
        console.log(error)
    }
}

const getAllSongs = async () => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/song/getAll`,
            method: "GET",
            secure: true,


        });
        return data;

    } catch (error) {
        console.log(error)
    }
}

const uploadSong = async (requestData) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/song/create`,
            method: "POST",
            secure: true,
            data: requestData


        });
        return data;

    } catch (error) {
        console.log(error)
    }
}


const addLike = async (requestData) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/song/addLike`,
            method: "POST",
            secure: true,
            data: requestData


        });
        return data;

    } catch (error) {
        console.log(error)
    }
}
const removeLike = async (requestData) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/song/removeLike`,
            method: "DELETE",
            secure: true,
            data: requestData


        });
        return data;

    } catch (error) {
        console.log(error)
    }
}
const addComment = async (requestData) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/song/addComment`,
            method: "POST",
            secure: true,
            data: requestData


        });
        return data;

    } catch (error) {
        console.log(error)
    }
}
const addFollower = async (requestData) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/user/follow`,
            method: "POST",
            secure: true,
            data: requestData


        });
        return data;

    } catch (error) {
        console.log(error)
    }
}
const removeFollower = async (requestData) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/user/unfollow`,
            method: "POST",
            secure: true,
            data: requestData


        });
        return data;

    } catch (error) {
        console.log(error)
    }
}

const singleChat = async (requestData) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/chat/send-message`,
            method: "POST",
            secure: true,
            data: requestData


        });
        return data;

    } catch (error) {
        console.log(error)
    }
}
const sendNoti = async (requestData) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/notification`,
            method: "POST",
            secure: true,
            data: requestData


        });
        return data;

    } catch (error) {
        console.log(error)
    }
}
const getNot = async (requestData) => {
    try {
        const { data } = await axios({
            url: `${API_ENDPOINT}/api/notification/user/${requestData}`,
            method: "GET",
            secure: true,


        });
        return data;

    } catch (error) {
        console.log(error)
    }

}




export { getNot, fetchAllUsers, createRoom, sendNoti, singleChat, sendMessage, getMeetingURL, getChat, getGroups, getAllSongs, uploadSong, addLike, removeLike, addComment, addFollower, removeFollower, deleteChat }