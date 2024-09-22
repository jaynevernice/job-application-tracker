import 'dotenv/config'
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3h' });
};

// Login
export const loginUser = async (request, response) => {

    const { email, password } = request.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        response.status(200).json({ fname: user.fname, lname: user.lname, email, token });

    } catch (error) {
        response.status(400).json({ error: error.message });
    }
};

// Signup
export const signupUser = async (request, response) => {
    const { fname, lname, email, password } = request.body;

    try {
        const user = await User.signup(fname, lname, email, password);

        const token = createToken(user._id);

        response.status(200).json({ fname: user.fname, lname: user.lname, email, token });

    } catch (error) {
        response.status(400).json({ error: error.message });
    }
};

export default { signupUser, loginUser };