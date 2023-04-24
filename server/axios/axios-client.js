import axios from "axios";

export const get = async(url) => {
    console.log("URL : ", url);
    const response = await axios.get(url)
    return response.data
};

// export default get;
