const randToken = require('rand-token');
const bcrypt = require('bcrypt');

const userModel = require('../models/UserModels/user.model');
const authMethod = require('../methods/auth.method');

const jwtVariable = require('../../../variables/jwt.variable');
const {SALT_ROUNDS} = require('../../../variables/auth.variable');
const constants = require("../../constants");

exports.register = (req, res) => {
    const username = req.body.username.toLowerCase();
    userModel.findOne({username: username}).then(async (user) => {
        if (user) {
            res.status(409).send('This account has already existed.')
        } else {
            const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
            const newUser = new userModel({
                username: username,
                password: hashPassword,
                role: constants.user_role,
            });
            const createUser = await newUser.save();
            if (!createUser) {
                return res
                    .status(400)
                    .send('There was an error during account creation, please try again.');
            }
            return res.send({
                username,
            });
        }
    });

};

exports.login = async (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    const user = await userModel.findOne({username: username}).lean()

    if (!user) {
        return res.status(401).send('Username does not exist.');
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Incorrect password.');
    }
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
        role: user.role,
        username: user.username,
    };
    const accessToken = await authMethod.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife,);
    if (!accessToken) {
        return res
            .status(401)
            .send('Login failed, please try again.');
    }

    let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
    if (!user.refreshToken) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        await userModel.findOneAndUpdate({username: user.username}, {refreshToken: refreshToken});
    } else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refreshToken = user.refreshToken;
    }

    return res.json({
        msg: 'Logged in successfully.', accessToken, refreshToken, user,
    });
};

exports.refreshToken = async (req, res) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).send('Access token not found.');
    }

    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).send('No refresh token found.');
    }

    const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET;
    const accessTokenLife =
        process.env.ACCESS_TOKEN_LIFE;

    // Decode access token đó
    const decoded = await authMethod.decodeToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );
    if (!decoded) {
        return res.status(400).send('Invalid access token.');
    }

    const username = decoded.payload.username; // Lấy username từ payload
    const roleUser = decoded.payload.role // lay role tu payload
    const user = await userModel.findOne({username: username});
    if (!user) {
        return res.status(401).send('User does not exist.');
    }

    if (refreshTokenFromBody !== user.refreshToken) {
        return res.status(400).send('Refresh token is not valid.');
    }

    // Tạo access token mới
    const dataForAccessToken = {
        roleUser,
        username,
    };

    const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
    );
    if (!accessToken) {
        return res
            .status(400)
            .send('Access token generation failed, please try again.');
    }
    return res.json({
        accessToken,
    });
};
