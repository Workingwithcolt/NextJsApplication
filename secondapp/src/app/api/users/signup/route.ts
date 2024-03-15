import { connect } from '@/dbConfig/dbConfig';
import User from '@/model/userModal';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();

        const { username, email, password } = reqBody;

        if ((username && email && password) ||
            (username !== "" && email !== "" && password !== "")) {
            const user = await User.findOne({ email, username })

            if (!user) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                console.log("asd");

                const newUser = new User({
                    username: username,
                    email: email,
                    password: hashedPassword
                })

                const savedUser = await newUser.save();

                return NextResponse.json(
                    { success: true, savedUser },
                    { status: 200 }
                );

            } else {
                return NextResponse.json(
                    { error: "User is Already Exist" });
            }
        } else {
            throw new Error("Something Went Wrong")
        }

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}