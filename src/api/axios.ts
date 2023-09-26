import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "04e7b627ccd0fc9a4210da95c15639f0",
    language: "ko-KR"
  }
  
})
export default instance;
