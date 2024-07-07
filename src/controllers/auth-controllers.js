import createHttpError from "http-errors";
import { register, findUser } from "../services/auth-services.js";
import { compareHash } from "../utils/hash.js";
import { createSession } from "../services/session-services.js";

const setupResponseSession = (res, { refreshToken, refreshTokenValidUntil, _id }) => {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });

    res.cookie("sessionId", _id, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });
};

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

    const session = await createSession(user._id);

    setupResponseSession(res, session);

    res.status(200).json({
        status: 200,
        message: "The user was logged in successfully!",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const refreshController = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });

    if (!user) {
        throw createHttpError(401, "Email is invalid!");
    }

    const passwordCompare = await compareHash(password, user.password);
    if (!passwordCompare) {
        throw createHttpError(401, "Password is invalid!");
    };

    const session = await createSession(user._id);

    setupResponseSession(res, session);

    res.status(200).json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: {
            accessToken: session.accessToken,
        }
    });
};
