import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userLoginSchema, userRegisterSchema } from '../validation/user-schemas.js';
import { loginController, logoutController, refreshController, registerController } from '../controllers/auth-controllers.js';

const authRouter = Router();

authRouter.post('/register', validateBody(userRegisterSchema), ctrlWrapper(registerController));
authRouter.post('/login', validateBody(userLoginSchema), ctrlWrapper(loginController));
authRouter.post('/refresh', ctrlWrapper(refreshController));
authRouter.post('/logout', ctrlWrapper(logoutController));
authRouter.post('/send-reset-email', validateBody(), ctrlWrapper());

export default authRouter;
