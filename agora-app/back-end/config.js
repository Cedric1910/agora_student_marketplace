import dotenv from 'dotenv';

dotenv.config();

/*
    This stuff exports our standard path for connecting to the database.
    It also exports the JWT thing for authentication.
*/
export default {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://agora_admin:agora123@cluster0.xbemo.mongodb.net/agora?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'jwtsecrettoken'
} 