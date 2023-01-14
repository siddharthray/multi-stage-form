import { Router } from 'express';
import formValidation from '../middleware/validation';
import { profileController } from '../controller/profile.controller';

const appRouter = Router();


appRouter.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


appRouter.get('/', function (req, res) {
    console.log("running successfully");
    res.end();
})

appRouter.post('/api/post', formValidation, profileController);

export default appRouter;