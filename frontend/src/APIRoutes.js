export const host = "https://snappy-bice-three.vercel.app";
// const BASE_URL = import.meta.env.VITE_API_URL;

export const registerRoute = `${host}api/auth/register`;
export const loginRoute = `${host}api/auth/login`;
export const setAvatarRoute = `${host}api/auth/setAvatar`;
export const dpRoute = `${host}/api/auth/upload`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`
export const getAllMessageRoute = `${host}/api/messages/getmsg`
export const deleteMessageRoute = `${host}/api/messages/deletemsg`
export const editMessageRoute = `${host}/api/messages/editmsg`
