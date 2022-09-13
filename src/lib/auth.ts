import { type JwtPayload, sign, verify } from "jsonwebtoken";
import { pbkdf2Sync } from "crypto";
import { env } from "$env/dynamic/private";

const verifyAsync = (token: string) => new Promise<JwtPayload>((resolve, reject) => {
    verify(token, env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return reject(err);
        }
        resolve(decoded as JwtPayload);
    })
});

const expiresIn = 15;
const PASSWORD_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = 'sha512';
const BYTE_TO_STRING_ENCODING = 'hex';

export const AUTH_COOKIE_NAME = 'authtoken';

export async function verifyToken(token: string) {
    const payload = await verifyAsync(token);

    return {
        ...payload,
        id: BigInt(payload.id),
    }
}

export function signToken(payload: any) {
    return sign(payload, env.JWT_SECRET, { expiresIn: `${expiresIn * 60 * 1000}` });
}

export function encryptPassword(password: string, salt?: string) {
    const hash = pbkdf2Sync(password, salt || env.PASSWORD_SALT, ITERATIONS, PASSWORD_LENGTH, DIGEST);
    return hash.toString(BYTE_TO_STRING_ENCODING);
}
