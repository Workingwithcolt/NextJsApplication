'use client';

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AppAlert } from "@/components/Alert";
import { error } from "console";
import toast, { Toaster } from 'react-hot-toast';
import { Loading } from "@/components/looding";

export default function SignUpPage() {
    const router = useRouter();

    const [user, setuser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [Process, setProcess] = useState({
        isloading: false,
        error: "",
        isSuccess: false

    });

    const onSignUp = async (e: any) => {
        const form = e.currentTarget;
        e.preventDefault();
        try {
            if (form.checkValidity() === true) {
                setProcess({
                    ...Process, error: "", isloading: true
                })
                const res = await axios.post("/api/users/signup", user);
                if (res.data.error) {
                    setProcess({
                        ...Process, error: res.data.error, isloading: false
                    })
                } else {
                    router.push('/profile');
                }
            }
        } catch (e: any) {
            console.log(e);

        }
    }

    if (Process.isloading) {
        return (
            <Loading />
        )
    }

    return (
        <form
            onSubmit={onSignUp}
            noValidate={true}
            className="flex flex-col m-2 bg-slate-50">
            <div className="flex flex-col gap-5 p-2 ">
                <h1 className="text-pretty text-center bg-slate-400 p-2">SignUp</h1>
                <div className="flex flex-col gap-3">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">userName</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        id="username"
                        value={user.username}
                        onChange={e => setuser({ ...user, username: e.target.value })}
                        placeholder="username"
                        required={true} />
                </div>
                <div className="flex gap-3  flex-col">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={e => setuser({ ...user, email: e.target.value })}
                        placeholder="Email"
                        required={true}
                    />
                </div>
                <div className="flex gap-3  flex-col">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={e => setuser({ ...user, password: e.target.value })}
                        placeholder="password"
                        required={true}
                    />
                </div>
                <button disabled={Process.isSuccess} type='submit' className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >SignUp</button>
                <button disabled={Process.isSuccess} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link href={"/login"}>Login</Link></button>
            </div>
            <Toaster />
            {
                Process.error !== "" &&
                (
                    <AppAlert message={Process.error}
                    />
                )
            }
        </form>
    )
}