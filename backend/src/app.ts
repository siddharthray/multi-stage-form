import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const router = express.Router();
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;


router.get('/', function (req, res) {
    console.log("running successfully");
    res.end();
})

router.post('/api/post', (req, res) => {
    const { firstName, lastName, email, phone, location, git, uploadCv, uploadCover = null, about } = req.body;
    console.log(req.body);
    setTimeout(() => {
        res.status(201).json({ data: req.body, msg: "submitted" })
    }, 3000)
})

app.use(router);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})