import axios from "axios";

export const apiUser = axios.create({
  baseURL: "http://localhost:8002/", //GATEWAY BASEURL: http://localhost:8090/api/peliculas/
  timeout: 2000,
  headers: { "X-Custom-Header": "foobar" },
});
export const apiUserGet = async (PATH, state) => {
  try {
    const request = await apiUser.get(PATH);
    state(request.data);
  } catch (error) {
    console.log(error);
  }
};
export const apiUserDelete = async (PATH) => {
  try {
    await apiUser.delete(PATH);
  } catch (error) {
    console.log(error);
  }
};
export const apiUserPost = async (PATH, modelo) => {
  try {
    await apiUser.post(PATH, modelo);
    console.log("Datos Registrados");
  } catch (error) {
    console.log(error);
  }
};
export const apiUserPut = async (PATH, modelo) => {
  try {
    await apiUser.put(PATH, modelo);
    console.log("Datos Actualizados");
  } catch (error) {
    console.log(error);
  }
};
