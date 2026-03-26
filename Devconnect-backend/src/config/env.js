require('dotenv').config();
const required = ['MONGO_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];
required.forEach(k => { if (!process.env[k]) throw new Error(`Missing env: ${k}`); });
