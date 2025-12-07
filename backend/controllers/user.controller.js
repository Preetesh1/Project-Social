import Profile from "../models/profile.model.js";
import user from "../models/user.model.js";
import crypto from 'crypto';

import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    console.log(req.body);
    try {
        const {name, email, password, username} = req.body;

        if(!name || !email || !password || !username) return res.status(400).json({ message: "All fields are required" })
            const user = await user.findOne({
                email
            });

            if(user) return res.status(400).json({ message: "User already exists" })

                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new user({
                    name,
                    email,
                    password: hashedPassword,
                    username
                });

                await newUser.save();

                const profile = new Profile({ userId: newUser._id});

                return res.json({ message: "User registered successfully" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) return res.status(400).json({ message: "All fields are required" })

        const user = await user.findOne({ email });

        if(!user) return res.status(404).json({ message: "User does not exist" })

        const isMatch = await bcrypt.compare(password, user.password);

        const token = crypto.randomBytes(32).toString("hex");

        await User.updateOne({ _id: user._id }, { token });

        return res.json({ token })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}