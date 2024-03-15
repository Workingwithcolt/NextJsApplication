'use client';

import { AppAlert } from "@/components/Alert";
import { Loading } from "@/components/looding";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
    const router = useRouter();

    const [user, setuser] = useState({
        email: "",
        password: "",
    })

    const [Process, setProcess] = useState({
        isloading: false,
        error: "",
        isSuccess: false

    });

    const onLogin = async (e: any) => {
        const form = e.currentTarget;
        e.preventDefault();
        console.log(form.checkValidity());

        try {
            if (form.checkValidity() === true) {
                setProcess({
                    ...Process, error: "", isloading: true
                })
                const res = await axios.post("/api/users/login", user);
                console.log(res);

                if (res.data.error) {
                    setProcess({
                        ...Process, error: res.data.error, isloading: false
                    })
                } else {
                    router.push('/profile');
                }
            } else {
                setProcess({
                    ...Process, error: "Please Fill All Fields..", isloading: false
                })
            }
        } catch (e: any) {
            console.log(e);
            setProcess({
                ...Process, error: e.response.data.error, isloading: false
            })
        }
    }

    if (Process.isloading) {
        return (
            <Loading />
        )
    }

    return (
        <form
            onSubmit={onLogin}
            noValidate={true} className="flex flex-col m-2 bg-slate-50">
            <div className="flex flex-col gap-5 p-2 ">
                <h1 className="text-pretty text-center bg-slate-400 p-2">Login</h1>
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
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Login</button>
            </div>
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