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


interface Response {
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    location: boolean,
    git: string,
    resume: object,
    uploadCover: object | null
    about: string

}


router.get('/', function (req, res) {
    console.log("running successfully");
    res.end();
})


router.post('/api/post', (req, res) => {

    const { firstName, lastName, email, phone, location, git, resume, uploadCover = null, about } = req.body;
    let formObject: Response = {
        firstName,
        lastName,
        email,
        phone,
        location,
        git,
        resume,
        uploadCover,
        about
    }
    if (!firstName ||
        !email ||
        !about ||
        !resume ||
        !git) {
        return res.status(400).json({ err: "Validation failed" })
    }
    return res.status(201).json({ data: formObject, msg: "submitted" })
})

app.use(router);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})