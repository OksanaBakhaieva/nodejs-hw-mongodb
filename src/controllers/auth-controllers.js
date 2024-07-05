import createHttpError from "http-errors";
import { register, findUser } from "../services/auth-services.js";
import { compareHash } from "../utils/hash.js";

export const registerController = async (req, res) => {
    const { email } = req.body;
    const user = await findUser({ email });
    if (user) {
        throw createHttpError(409, "Email in use");
    }

    const newUser = await register(req.body);

    const data = {
        name: newUser.name,
        email: newUser.email,
    };

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data,
    });
};

export const loginController = async (req, res) => {
    const { email, password } = req.body;
        const user = await findUser({ email });

    if (!user) {
        throw createHttpError(401, "Email is invalid!");
    }

    const passwordCompare = await compareHash(password, user.password);
    if (!passwordCompare) {
        throw createHttpError(401, "Password is invalid!");
    };

    // const accessToken = '122.4q52';
    // const refreshToken = '2132.4151.33';

    // res.json({
    //     accessToken,
    //     refreshToken
    // });

    res.status(200).json({
        status: 200,
        message: "The user was logged in successfully!",

    });
};
