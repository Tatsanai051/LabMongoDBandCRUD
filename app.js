require('dotenv').config(); // โหลด .env

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const MONGO_DB_URI = process.env.MONGO_DB_URI; // ใช้ค่า MONGO_DB_URI จาก .env

// เชื่อมต่อกับ MongoDB
mongoose
    .connect(MONGO_DB_URI, {})
    .then(() => console.log('เชื่อมต่อ MongoDB สำเร็จ'))
    .catch(err => console.log('ข้อผิดพลาดในการเชื่อมต่อ MongoDB:', err));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// นำเข้าและใช้งาน routes
const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

const productRoute = require('./routes/products'); // ตรวจสอบเส้นทางและการสะกดคำ
app.use('/api/products', productRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});