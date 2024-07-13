import createHttpError from 'http-errors';
import User from '../db/models/User.js';
import { hashValue } from "../utils/hash.js";
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';
import { SMTP, TEMPLATES_DIR } from '../constants/index.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

export const findUser = filter => User.findOne(filter);

export const register = async (data) => {
    const { password } = data;
    const hashPassword = await hashValue(password);
    return User.create({ ...data, password: hashPassword });
};

export const requestResetToken = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw createHttpError(404, "User not found!");
    }
    const resetToken = jwt.sign(
        {
            sub: user._id,
            email,
        },
        env('JWT_SECRET'),
        {
            expiresIn: '15m',
        },
    );
    const resetPasswordTemplatePath = path.join(
        TEMPLATES_DIR,
        'reset-password-email.html',
    );

    const templateSource = (
        await fs.readFile(resetPasswordTemplatePath)
    ).toString();

    const template = handlebars.compile(templateSource);
    const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

    await sendEmail({
        from: env(SMTP.SMTP_FROM),
        to: email,
        subject: 'Reset your password',
        html,
    });
};
