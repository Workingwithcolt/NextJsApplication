'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function Profile() {
    const router = useRouter();
    const logOut = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout Successfully")
            router.push('/login')
        } catch (e: any) {
            toast.error(e.message)
        }
    }
    return (
        <div className="flex flex-col m-2 bg-slate-50">
            <div className="flex flex-col gap-5 p-2 ">
                Profile
            </div>
            <button
                className="text-white bg-blue-700 mx-auto hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={logOut}
            >Logout</button>
        </div>
    )
}