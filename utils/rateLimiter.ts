import { get, set } from "lodash";
let rateLimiterObj = {};

export const rateLimiter = (act: string, amount: number, ms: number) => {
    const now = Date.now();
    const windowStart = now - ms;

    const requestTimestamps: number[] = get(rateLimiterObj, act, []).filter((timestamp) => timestamp > windowStart);
    requestTimestamps.push(now);

    set(rateLimiterObj, act, requestTimestamps);
    return requestTimestamps.length <= amount;
};
