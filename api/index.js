require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const catRoute = require('./routes/categories')
const port = process.env.PORT || 3001
const multer = require('multer')
const cors = require('cors')
// middlewares
app.use(express.json({ limit: '3mb' }));
app.use(cors());
// mongo connection
mongoose.set('strictQuery', false);
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.MONGO_URL, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    filename: (req, file, callback) => {
        callback(null, "mangu.jpeg")
    }
})

const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("FILE HAS BEEN UPLOADED")
})

// Serve robots.txt from the public folder
app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/post", postRoute)
app.use("/api/category", catRoute)
app.get('/*', (req, res) => {
    console.log('working!!!');
})

app.listen(port);
console.log('listening on port ' + port);