import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        //check if user already exists
        const user = await User.findOne({ clerkId: id });
        if (!user) {
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl: imageUrl,
            });
        }

        res.status(200).json({success: true});
    } catch (error) {
        console.log("Error in auth callback", error);
        res.status(500).json({ message: "Failed to add user", error: error });
    }
}