import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userLoginSchema, userRegisterSchema } from '../validation/user-schemas.js';
import { loginController, refreshController, registerController } from '../controllers/auth-controllers.js';

const authRouter = Router();

authRouter.post('/register', validateBody(userRegisterSchema), ctrlWrapper(registerController));
authRouter.post('/login', validateBody(userLoginSchema), ctrlWrapper(loginController));
authRouter.post('/refresh', ctrlWrapper(refreshController));

export default authRouter;
