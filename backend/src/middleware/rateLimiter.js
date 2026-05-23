import ratelimiter from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    // Implement rate limiting logic here
    try{
        const { success } = await ratelimiter.limit(req.ip);
        if (!success) {
            return res.status(429).json({ message: "Too many requests, please try again later" });
        }
        next();
    } catch (error) {
        console.error("Rate limiter error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default rateLimiter;