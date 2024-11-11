import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import { connectDB } from './db/connectDB.js';

import userRoute from './routes/userRoute.js';
import itemsRoute from './routes/itemsRoute.js';
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';

dotenv.config();

const app = express();
const PORT = 4000;
const __dirname = path.resolve();

app.use(cors({ origin: process.env.CLIENT_URL?process.env.CLIENT_URL:'http://localhost:5173', credentials: true }));


app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // s us to parse incoming cookies

app.use('/api/auth', userRoute);

//api endpoints
app.use('/api/items',itemsRoute)
app.use('/images',express.static('uploads'))

app.use('/api/user',userRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRoute)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/admin/dist')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'admin', 'dist', 'index.html'));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log('Server is running on port: ', PORT);
});
