import user from "../models/user.model.js";


export const activeCheck = async (req, res) => {

    return res.status(200).json({ message : "RUNNING" })
}

const register = async (req, res) => {

    try {
        const {name, email, password, username} = req.body;

        if(!name || !email || !password || !username) return res.status(400).json({ message: "All fields are required" })
            const user = await user.findOne({
                email
            });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}