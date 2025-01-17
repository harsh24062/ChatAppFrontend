import { MdSend } from "react-icons/md"

const ChatPage = () => {
  return (

    <div className="">

        {/* header container */}
        <header className=" fixed w-full h-16 border-white bg-gray-400 dark:bg-gray-600 dark:border-gray-700 border py-2 flex justify-around items-center">
             
            {/* room name container */}
            <div className="">
                <h1 className="text-2xl"> Room : <span> Family room</span> </h1>
            </div>

            {/* username container */}
            <div className="ml-[-120px]">
              <h1 className="text-2xl"> Username : <span> Osk123</span> </h1>
            </div>
 
            {/* leave room container */}
            <div>
               <button className="text-center font-normal text-sm text-white dark:text-white   bg-red-600 px-2 py-2 rounded-lg hover:scale-105 hover:shadow-red-500 hover:text-sm hover:bg-blue-500 transition-all duration-300">
                 Leave Room
                </button>
            </div>

        </header>

        {/*input message container */}
        <div className=" border fixed bottom-0 w-full h-12 bg-gray-400 dark:bg-gray-600 border-white dark:border-gray-700 ">
            <div className="h-full px-2 gap-2 rounded-md mx-auto  w-2/3 dark:border-gray-700 flex justify-between items-center">
            <input type="text" placeholder="Type your message here..." className=" w-full border dark:border-gray-600 dark:bg-gray-500 px-3 py-2 rounded  h-full focus:outline-none focus:ring-1 focus:ring-green-400"/>
            <button className="bg-red-500 dark:bg-blue-600 px-4 py-3 rounded-xl hover:bg-green-500 hover:scale-105 transition-all duration-200"> <MdSend size={20}/> </button>
            </div>
        </div>

    </div>

  )
}

export default ChatPage