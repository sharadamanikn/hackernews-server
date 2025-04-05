const jwtSecretKey = process.env.JWT_SECRET_KEY || process.exit(1);
module.exports = { jwtSecretKey };