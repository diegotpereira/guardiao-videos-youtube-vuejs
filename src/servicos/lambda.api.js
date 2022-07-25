import axios from "axios"

const API_HOST = process.env.VUE_APP_API_HOST


export default {
    getVideos: () => axios.get(`${API_HOST}/videos`).then(({ data }) => data),
    deletarVideo: (id) => 
    axios.delete(`${API_HOST}/videos/${id}`).then(({ data }) => data),
    addVideo: (video) =>
    axios.post(`${API_HOST}/videos`, video).then(({ data }) => data)
    
}
