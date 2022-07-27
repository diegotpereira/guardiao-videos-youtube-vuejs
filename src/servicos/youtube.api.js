import axios from "axios";

const googleApiChave = process.env.VUE_APP_GOOGLE_API_KEY

export default {
    getVideoInformacao: (id) => 
        axios
            .get("https://www.googleapis.com/youtube/v3/videos", {
                params: {
                    id,
                    key: googleApiChave,
                    part: "snipper"
                },
            })
            .then(({ data }) => data.items[0] ?? false)
            .catch(err => {
                console.log(err);
            })
}