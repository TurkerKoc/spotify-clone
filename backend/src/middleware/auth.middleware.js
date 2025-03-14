import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    const { userId } = req.auth.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized - You must be logged in to access this resource" });
    }
    next(); //if user is logged in, call next function
}

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized - You must be an admin to access this resource" });
        }
        next();
    } catch (error) {        
        next(error);
    }
}