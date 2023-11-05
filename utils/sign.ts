import { SignJWT } from "jose";

export const signJWT = async (payload: {}) => {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const alg = "HS256";

        return new SignJWT(payload).setProtectedHeader({ alg }).sign(secret);
    } catch (error) {
        console.log(error);
    }
};
