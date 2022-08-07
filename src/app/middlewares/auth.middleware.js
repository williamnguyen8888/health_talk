const jwtVariable = require('../../../variables/jwt.variable');

const userModle = require('../models/UserModels/user.model');

const authMethod = require('../methods/auth.method');
const constants = require("../../constants");

exports.isAuth = async (req, res, next) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	console.log(verified)
	if (!verified) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}

	const user = await userModle.findOne({username:verified.payload.username});
	req.user = user;

	return next();
};
exports.isAdminAuth = async (req, res, next) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified || verified.payload.role != constants.admin_role) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}

	const user = await userModle.findOne({username:verified.payload.username});
	req.user = user;

	return next();
};
