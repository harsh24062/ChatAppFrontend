import { useEffect, useRef, useState } from "react"
import { MdAttachFile, MdSend } from "react-icons/md"
import Avatar from "../assets/avataaars.png"
import senderAvatar from "../assets/SenderAvatar.png"
import useChatContext from "../context/ChatContext"
import { useNavigate } from "react-router"
import SockJS from "sockjs-client"
import { baseURL } from "../config/AxiosHelper"
import { Stomp } from "@stomp/stompjs"
import toast from "react-hot-toast"
import { getMessages } from "../Services/RoomService"
import { timeAgo } from "../config/ChatTime"


const ChatPage = () => {

  const [messages,setMessages] = useState([]);

  const [input,setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient,setStompClient] = useState(null);
  const [userName,setUserName] = useState("");

  const {roomId:contextRoomId,setRoomId,currentUser,setCurrentUser,connection,setConnection} = useChatContext();
  

  const navigate = useNavigate();

    
  useEffect(()=>{
    if(!connection){
      navigate('/')
    }
  },[connection,navigate])



  //load message
  useEffect( () => {
   
     async function loadMessages(){

       try {

        const message = await getMessages(contextRoomId)
        console.log(message)
        setMessages(message)

       } catch (error) {
         if(error.status==400){
          console.log(error)  
         }
         toast.error(" Problem in server cant load message right now ")
       }

     }

  if(connection){
     loadMessages()
  }
  },[])


  //intialize stomp websocket
   useEffect( () => {

    const connnectWebSocket = () =>{

      setUserName(currentUser)
      
      //sock JS
      const sock = new SockJS(`${baseURL}/chat`)

      const client = Stomp.over(sock)
      
      client.connect({},() => {

        setStompClient(client);

        toast.success("Connected")

        client.subscribe(`/topic/room/${contextRoomId}`,(message) => {
           console.log(message)

           const newMessage = JSON.parse(message.body)

           setMessages((prev) => [...prev,newMessage])
        })

      })
    }

    if(connection){
    connnectWebSocket()
    }

   },[contextRoomId,currentUser])


  // handle sending of message
  const sendMessage = async () => {

    if(stompClient && connection && input.trim()){
      
      console.log(input)

      const message = {
         sender:currentUser,
         content:input,
         roomId:contextRoomId
      }

      stompClient.send(`/app/sendMessage/${contextRoomId}`,{},JSON.stringify(message));
      setInput("")


    }

  }

  // scroll down chat page

  useEffect(() => {
    if(chatBoxRef.current){

      chatBoxRef.current.scroll({
        top:chatBoxRef.current.scrollHeight,
        behavior:"smooth"
      })  

    }
  },[messages])


  // handle leave room button

  function handleLogOut(){
    stompClient.disconnect();
    setConnection(false);
    setCurrentUser("")
    setUserName("")
    setRoomId("");

  }

  

  return (

    <div className=" dark:bg-black">

      {/* header container */}
        <header className=" fixed w-full h-16 border-white bg-gray-400 dark:bg-gray-600 dark:border-gray-700 border py-2 flex justify-around items-center">
             
            {/* room name container */}
            <div className="">
                <h1 className="text-2xl"> Room Id: <span>{contextRoomId}</span> </h1>
            </div>

            {/* username container */}
            <div className="ml-[-120px]">
              <h1 className="text-2xl"> Username : <span>{currentUser}</span> </h1>
            </div>
 
            {/* leave room container */}
            <div>
               <button onClick={handleLogOut} className="text-center font-normal text-sm text-white dark:text-white   bg-red-600 px-2 py-2 rounded-lg hover:scale-105 hover:shadow-red-500 hover:text-sm hover:bg-blue-500 transition-all duration-300">
                 Leave Room
                </button>
            </div>

        </header>

      {/*chat screen */}  
      <main ref={chatBoxRef} className=" py-16 border w-10/12 mx-auto h-screen bg-neutral-300 dark:bg-slate-700  overflow-auto">
       {  
          messages.map((message,index) =>(
            <div key={index} className={`my-4 mb-10 flex ${message.sender==userName?"justify-end":"justify-start"} `}>
                 
              <div className="flex flex-row gap-5 px-10 ">
                <img src={message.sender==userName?senderAvatar:Avatar} alt="N/A" className="w-28 h-28 hover:scale-125 transition-all duration-300" />
                <div className={`flex flex-col gap-1 ${message.sender==userName?"bg-green-600":"bg-blue-500"} rounded-md hover:bg-orange-400`}> 
                  <p className="text-xl  font-bold text-slate-800 font-serif m-1">{message.sender}</p>
                  <p className="py-3 px-1">{message.content}</p>
                  <p className="text-xs px-4 ">{timeAgo(message.timeStamp)}</p>
                </div>
              </div> 

            </div>
          ) )
       }
      </main>

      {/*input message container */}
        <div className=" fixed bottom-0 w-full h-12 ">
            <div className="h-full px-2 gap-2 rounded-md mx-auto  w-2/3 dark:border-gray-700 flex justify-between items-center">
              <input 
              value={input}
              onChange={(e) => {setInput(e.target.value)} }
              type="text" placeholder="Type your message here..." className=" w-full border dark:border-gray-600 dark:bg-gray-500 px-3 py-2 rounded-2xl  h-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              
              <div>
               <button className="bg-purple-500 dark:bg-purple-600 px-4 py-3 rounded-xl hover:bg-green-500 dark:hover:bg-green-500 dark:hover:scale-105 hover:scale-105 transition-all duration-200">
                 <MdAttachFile size={20}/> 
                 </button>
              </div>
              <div>
               <button onClick={sendMessage} className="bg-red-500 dark:bg-blue-500 px-4 py-3 rounded-xl hover:bg-green-500 dark:hover:bg-green-500 dark:hover:scale-105 hover:scale-105 transition-all duration-200">
                 <MdSend size={20}/>
                </button>
              </div>
            </div>
        </div>

    </div>

  )
}

export default ChatPage