import User from '../db/models/User.js';

export const findUser = filter => User.findOne(filter);
export const register = async (data) => User.create(data);

