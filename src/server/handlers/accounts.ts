
import prisma from '../../prisma'

//import { genSalt, hash } from "bcrypt-ts";

export async function create(req, h) {

/*

    try {

        const salt = await genSalt(10)
        const hashedPassword = await hash(req.payload.password, salt)
        // hash password with bcrypt

        const user = await prisma.user.findFirst({
            where: {
                email: req.payload.email
            }
        })

        if (user) {
            return h.response({ message: 'Email already exists' }).code(400)
        }

        const account = await prisma.user.create({
            data: {
                email: req.payload.email,
                password: hashedPassword
            }
        })

        return h.response({ account }).code(200)

    } catch(error) {

        console.log(error)
        return h.response(error).code(500)

    }
*/
  
  }
