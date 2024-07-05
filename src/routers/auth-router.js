import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userRegisterSchema } from '../validation/user-schemas.js';
import { registerController } from '../controllers/auth-controllers.js';

const authRouter = Router();

authRouter.post('/register', validateBody(userRegisterSchema), ctrlWrapper(registerController));



export default authRouter;
