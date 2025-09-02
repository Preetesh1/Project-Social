


export const activeCheck = async (req, res) => {

    return res.status(200).json({ message : "RUNNING" })
}

const register = async (req, res) => {

    try {
        const {name, email, password} = req.body;
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}