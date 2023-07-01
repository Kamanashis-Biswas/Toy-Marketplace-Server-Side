import {Router} from 'express';
import toyController from '../controller/toy.controller.js';
import authController from '../controller/auth.controller.js';
import { authenticationMiddleWare } from '../middlewares/auth.middleware.js';
export const router = new Router();

router.get('/', (req, res)=>{res.send("Hello, world!")});
router.post('/create-toy', authenticationMiddleWare, toyController.createToy);
router.get('/get-all-toys', toyController.getAllToys);
router.get('/get-my-toys', authenticationMiddleWare, toyController.getMyToys);
router.get('/toy/:id', toyController.getToyDetails);
router.patch('/toy/:id', authenticationMiddleWare, toyController.updateToy);
router.delete('/toy/:id', authenticationMiddleWare, toyController.deleteMyToys);
router.get('/get-category-toy', toyController.getToysByCategory);
router.post('/set-cookies', authController.setCookies);