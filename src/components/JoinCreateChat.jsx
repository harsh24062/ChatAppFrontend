import ChatIcon from "../assets/chat.png"

const JoinCreateChat = () => {
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
            <input type="text" id="name" className="w-full dark:text-black bg-orange-100 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"/>
        </div>

        {/* roomId div*/}
        <div className="mb-2">
           <label htmlFor="roomId" className="block mb-2 text-left text-xl font-medium font-serif text-gray-200 hover:text-yellow-300 ">
            Room Id
            </label>
            <input type="text" id="roomId" className="w-full dark:text-black bg-orange-100 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"/>
        </div>

        {/* button */}

        <div className="flex justify-center gap-14">
          <button className="px-2 py-3 bg-emerald-500 text-white font-sans text-1xl font-semibold rounded-md hover:bg-blue-300 hover:text-black hover:text-lg hover:border-e-lime-500">
            Join Room
          </button>
            
          <button className="px-2 py-3 bg-red-600 text-white font-sans text-1xl font-semibold rounded-md hover:bg-blue-300 hover:text-black hover:text-lg hover:border-e-lime-500">
            Create Room 
          </button>
        </div>

     </div>

   </div>  

  )
}

export default JoinCreateChat
