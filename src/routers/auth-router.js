import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { sendResetEmailSchema, userLoginSchema, userRegisterSchema } from '../validation/user-schemas.js';
import { loginController, logoutController, refreshController, registerController, sendResetEmailController } from '../controllers/auth-controllers.js';

const authRouter = Router();

authRouter.post('/register', validateBody(userRegisterSchema), ctrlWrapper(registerController));
authRouter.post('/login', validateBody(userLoginSchema), ctrlWrapper(loginController));
authRouter.post('/refresh', ctrlWrapper(refreshController));
authRouter.post('/logout', ctrlWrapper(logoutController));
authRouter.post('/send-reset-email', validateBody(sendResetEmailSchema), ctrlWrapper(sendResetEmailController));

export default authRouter;
