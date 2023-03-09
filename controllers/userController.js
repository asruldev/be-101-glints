const {Op} = require('sequelize');
const model = require('../models');
const { encryptData, decryptData } = require('../utils/hash');
const {sendErrorResponse, sendSuccessResponse} = require("../utils/sendResponse");

const {User, Role} = model;
const defaultRole = "Authenticated"

module.exports = {
    async signUp(req, res) {
        const {email, password, name} = req.body;
        try {
            let user = await User.findOne({where: {[Op.or]: [{email}]}});
            if (user) {
                return sendErrorResponse(res, 422, 'User with that email or phone already exists');
            }
            user = await User.create({
                name,
                email,
                password: encryptData(password),
            });

            const userRole = await Role.findOne({ where: { name: defaultRole } });
            user.addRole(userRole);

            return sendSuccessResponse(res, 201, {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            }, 'Account created successfully');
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.', e)
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) return sendErrorResponse(res, 404, 'Incorrect login credentials. Kindly check and try again');
            const checkPassword = decryptData(encryptData(password), user.password);
            if (!checkPassword) {
                return sendErrorResponse(res, 400, 'Incorrect login credentials. Kindly check and try again');
            }

            const token = await user.newToken();
            return sendSuccessResponse(res, 200, {
                token: token.accessToken,
            }, 'Login successfully');
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Server error, contact admin to resolve issue', e);
        }
    },

    async me(req, res) {
        const { id } = req.user;

        try {
            const user = await User.findOne({ where: { id } });

            if (!user) return sendErrorResponse(res, 404, 'No user found');
            return sendSuccessResponse(res, 200, user);
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Server error, contact admin to resolve issue', e);
        }
    }
}