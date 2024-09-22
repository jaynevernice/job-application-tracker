import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel.js';


const requireAuth = async (request, response, next) => {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET); // Verify token

        request.user = await User.findOne({ _id }).select('_id');

        next();
    } catch (error) {
        console.log(error);
        response.status(401).json({ error: 'Request is not authorized' });
    }
};

export default requireAuth;