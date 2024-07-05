import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userRegisterSchema } from '../validation/user-schemas.js';
import { loginController, registerController } from '../controllers/auth-controllers.js';

const authRouter = Router();

authRouter.post('/register', validateBody(userRegisterSchema), ctrlWrapper(registerController));
authRouter.post('/login', ctrlWrapper(loginController));


export default authRouter;
