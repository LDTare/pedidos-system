import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {db} from "@/lib/prisma";

export const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {label: "Email", type:"email", placeholder:" EEMQ MAIL"},
                password: { label: "Contraseña", type: "password"}, 
            },
            
            async authorize(credentials)
            {
                //verficiar las credenciales ingresadas
                if(!credentials.email || !credentials.password)
                {
                    throw new Error('Ingrese credenciales por favor')
                }
    
                //verificar si el usuario existe
                const user = await db.user.findFirst({
                    where:{
                        email: credentials.email
                    }
                });
    
                if(!user){
                    throw new Error('Usuario no encontrado');
                }
    
                const passwordsValidate = await bcrypt.compare(credentials.password, user.password);
                if (!passwordsValidate){
                    throw new Error("Contraseña incorrecta");
                }

                return user;
            },
        })
    ],

    callbacks: {

        //Funcion para añadir nuevos campos al token "session"
        async jwt({ token, user, session}){
            if(user){
                return{
                    ...token,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                }
            }
            return token;
        },

        //Funcion para exportar los campos deseados a el metodo session de react
        async session({ session, token, user}){
            return{
                ...session,
                user: {
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    username: token.username,
                }
            };
        },
    },

    session: {
        strategy: "jwt",
    },

    pages:{
        signIn:'/auth/login',
    },
    

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}
