import axiosInstance from "@/lib/axios"
import { useAuthStore } from "@/stores/useAuthStore"
import { useChatStore } from "@/stores/useChatStore"
import { useAuth } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"

const updateApiToken = async (token: string | null) => {
  // set the token to the axios instance in the headers
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"]
  }
}

// this is a provider that will wrap the app and provide the auth context to the app
const AuthProvider = ({ children }: { children: React.ReactNode }) => { // children is the app that will be wrapped
  const { getToken, userId } = useAuth() // get the token and user id from the clerk
  const [loading, setLoading] = useState(true); // loading state
  const { checkAdminStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken()
        updateApiToken(token)
        if (token) { // if there is a token, check if the user is an admin
          await checkAdminStatus();
          // as soon as the user is logged in, initialize the socket
          if(userId) {
            console.log("initializing socket", userId);
            initSocket(userId);
          }
        }
      } catch (error) {
        updateApiToken(null); // if there is an error, set the token to null
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    initAuth()

    // if user closes the tab, the socket will be disconnected
    return () => {
      disconnectSocket();
    }
  }, [getToken, userId, initSocket, disconnectSocket, checkAdminStatus]);  // adding getToken here means that the function will only run when the token changes

	if (loading)
		return (
			<div className='h-screen w-full flex items-center justify-center'>
				<Loader className='size-8 text-emerald-500 animate-spin' />
			</div>
		);

  return (
    <div>
      {children}
    </div>
  )
}

export default AuthProvider
