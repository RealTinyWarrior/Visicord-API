import { jwtVerify } from "jose";

export const verifyJWT = async <T>(token: string): Promise<T> => {
    try {
        return (await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))).payload as T;
    } catch (error: any) {
        console.log(error);

        if (error.code === "ERR_JWT_EXPIRED") throw new Error(error.code);
        throw new Error("ERR_NOT_VERIFIED");
    }
};
