<<<<<<< HEAD
export const host = "http://localhost:5000";
// const BASE_URL = import.meta.env.VITE_API_URL;

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const dpRoute = `${host}/api/auth/upload`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`
export const getAllMessageRoute = `${host}/api/messages/getmsg`
export const deleteMessageRoute = `${host}/api/messages/deletemsg`
export const editMessageRoute = `${host}/api/messages/editmsg`






// app.use(
//   cors({
//     origin: "https://snappy-chatapp-five.vercel.app",
//     credentials: true, // if you're using cookies or auth headers
//   })
// );
// app.options("*", cors());
=======
export const host = "https://snappy-bice-three.vercel.app/";
// const BASE_URL = import.meta.env.VITE_API_URL;

export const registerRoute = `${host}api/auth/register`;
export const loginRoute = `${host}api/auth/login`;
export const setAvatarRoute = `${host}api/auth/setAvatar`;
export const dpRoute = `${host}api/auth/upload`;
export const allUsersRoute = `${host}api/auth/allUsers`;
export const sendMessageRoute = `${host}api/messages/addmsg`
export const getAllMessageRoute = `${host}api/messages/getmsg`
export const deleteMessageRoute = `${host}api/messages/deletemsg`
export const editMessageRoute = `${host}api/messages/editmsg`
>>>>>>> 922d932c437221c9eb84fb03406b859a2debacf2
