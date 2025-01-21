import { httpClient } from "../config/AxiosHelper";

export const createRoomApi= async(roomDetail) =>{
const respone = await httpClient.post('/api/v1/rooms',roomDetail,{
    headers:{
        "Content-Type": "text/plain",
    },
});
return respone.data;
};

export const joinRoomApi = async(roomId) =>{
   const respone =  await httpClient.get(`/api/v1/rooms/${roomId}`);
   return respone.data;
} 