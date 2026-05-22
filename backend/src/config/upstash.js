import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import dotenv from 'dotenv';
dotenv.config();


const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
});

const ratelimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export default ratelimiter; 