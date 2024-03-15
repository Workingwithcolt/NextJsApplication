import { connect } from '@/dbConfig/dbConfig';
import User from '@/model/userModal';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const { email, password } = reqBody;

        if ((email && password) || (email !== "" && password !== "")) {
            const user = await User.findOne({ email })

            if (!user) {
                return NextResponse.json({
                    error: "User does not Exist !!"
                }, { status: 400 })
            }

            const validatePassword = await bcrypt.compare(password, user.password);

            if (!validatePassword) {
                return NextResponse.json({
                    error: "Password is Invalid"
                })
            }

            //create the token data
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            }

            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1h' });

            const response = NextResponse.json({
                message: "Login successfully",
                success: true
            }, { status: 200 })

            response.cookies.set("token", token, {
                httpOnly: true,
            })

            return response;

        } else {
            throw new Error("Something is Missing ")
        }

    } catch (e: any) {
        return NextResponse.json({
            error: e.message
        }, { status: 500 })
    }
}
