import express from 'express';
import morgan from 'morgan';
import appRouter from './router/route';

const app = express();

// const router = express.Router();
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         credentials: true,
//     })
// );

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(appRouter);

const PORT = process.env.PORT || 3001;

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})