import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 2000,
  headers: { "X-Custom-Header": "foobar" },
});

const axiosConnection = async (PATH, state) => {
  try {
    const request = await axiosInstance.get(PATH);
    state(request.data);
  } catch (error) {
    console.log(error);
  }
};

export default axiosConnection;
