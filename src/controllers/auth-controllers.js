import createHttpError from "http-errors";
import { register, findUser } from "../services/auth-services.js";
import { compareHash } from "../utils/hash.js";
import { createSession, deleteSession, findSession } from "../services/session-services.js";

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
        message: "Successfully logged in a user!",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const refreshController = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;

    const currentSession = await findSession({_id: sessionId, refreshToken });

    if (!currentSession) {
        throw createHttpError(401, "Session not found!");
    }

    const refreshTokenExpired = new Date() > new Date(currentSession.refreshTokenValidUntil);
    if (refreshTokenExpired) {
        throw createHttpError(401, "Session expired!");
    }

    const newSession = await createSession(currentSession.userId);
    setupResponseSession(res, newSession);

    res.status(200).json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: {
            accessToken: newSession.accessToken,
        }
    });
};

export const logoutController = async (req, res) => {
    const { sessionId } = req.cookies;
    if (!sessionId) {
        throw createHttpError(401, "Session not found!");
    };
    await deleteSession({ _id: sessionId });
    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
};
