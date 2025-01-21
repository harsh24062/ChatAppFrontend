import { useState } from "react"
import ChatIcon from "../assets/chat.png"
import toast from "react-hot-toast";
import { createRoomApi, joinRoomApi } from "../Services/RoomService";
import { useNavigate } from "react-router";
import useChatContext from "../context/ChatContext";

const JoinCreateChat = () => {

  const [detail,setDetail] = useState({
    roomId:"",
    userName:"" 
  });

  const {setRoomId,setCurrentUser,setConnection} = useChatContext();
  const navigate= useNavigate();

  function handleInputFormChange(event){
   setDetail({
    ...detail,   // The spread operator (...) is used to copy all the properties from an existing object or array into a new object or array.
                 //Without the spread operator, only the updated key-value pair would remain in the state, and all other properties would be lost.
    [event.target.name]:event.target.value,
   })
  }

  function validateForm(){
    if(detail.userName=="" || detail.roomId==""){
      toast.error("Name or Room Id is missing!!")
      return false;
    }
    return true;
  }

  async function joinRoom(){

     if(validateForm()){
      //joinroom

      try {

        const room = await joinRoomApi(detail.roomId);
        setConnection(true)
        setRoomId(room.roomId)
        setCurrentUser(detail.userName)
        toast.success("Joined Room Successfully")
        navigate('/chat')
      } catch (error) {
        
        if(error.status==400){
         toast.error("No Such room exist")
        }
        else{
        toast.error("Error in joining Room")
        console.log(error)
        }
      }
     }
  }

  async function createRoom(){
     
    if(validateForm()){

      //create room
        console.log(detail);

      // call api(backend) to create room 

      try{
        const response = await createRoomApi(detail.roomId);
        console.log(response);
        toast.success("Room created successfully");

        //join the room
        setCurrentUser(detail.userName)
        setRoomId(response.roomId)
        setConnection(true)

        // forward to chat page
         navigate('/chat')

      }catch(error){
         if(error.status==400){
          toast.error("This RoomId already Used by SomeOne, Try new RoomId");
         }
         else{
          toast.error("error in room creation");
          console.log("error in room creation");
         }
      }
    }
  }

  return (

    <div className="min-h-screen flex justify-center items-center ">

     
     <div className="flex flex-col gap-4 p-8 w-full max-w-md rounded-2xl bg-indigo-900 hover:scale-105 hover:bg-indigo-800  hover:shadow-lg transition-all duration-300 "> 
    
      <div>
        <img src={ChatIcon} className="h-72"></img>
      </div>


       <h1 className="text-3xl font-sans font-bold text-center text-purple-500 hover:text-rose-50 ">
         Join room / Create Room
        </h1>

       {/* name div*/}
        <div>
           <label htmlFor="name" className="block mb-2 text-left text-xl font-medium font-serif text-gray-200 hover:text-yellow-300 ">
            Your Name
            </label>
            <input
             onChange={handleInputFormChange}
             value={detail.userName}
             name="userName"
             placeholder="Enter your name..."
             type="text" id="name"
             className="w-full dark:text-black bg-orange-100 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
             />
        </div>

        {/* roomId div*/}
        <div className="mb-2">
           <label htmlFor="roomId" className="block mb-2 text-left text-xl font-medium font-serif text-gray-200 hover:text-yellow-300 ">
            Room Id
            </label>
            <input 
            onChange={handleInputFormChange}
            value={detail.roomId}
            name="roomId"
            placeholder="Enter roomId here..."
              type="text" id="roomId" className="w-full dark:text-black bg-orange-100 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
             />
        </div>

        {/* button */}

        <div className="flex justify-center gap-14">
          <button onClick={joinRoom} className="px-2 py-3 bg-emerald-500 text-white font-sans text-1xl font-semibold rounded-md hover:bg-blue-300 hover:text-black hover:text-lg hover:border-e-lime-500">
            Join Room
          </button>
            
          <button onClick={createRoom} className="px-2 py-3 bg-red-600 text-white font-sans text-1xl font-semibold rounded-md hover:bg-blue-300 hover:text-black hover:text-lg hover:border-e-lime-500">
            Create Room 
          </button>
        </div>

     </div>

   </div>  

  )
}

export default JoinCreateChat
