import axios from "axios";
//const BASEURL = process.env.REACT_APP_BASEURL;

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/", //BASEURL,
  timeout: 2000,
  headers: { "X-Custom-Header": "foobar" },
});

const axiosGet = async (PATH, state) => {
  try {
    const request = await axiosInstance.get(PATH);
    state(request.data);
  } catch (error) {
    console.log(error);
  }
};

export const axiosPost = async (PATH, modelo) => {
  try {
    await axiosInstance.post(PATH, modelo);
    console.log("Datos Registrados");
  } catch (error) {
    console.log(error);
  }
};

export default axiosGet;
