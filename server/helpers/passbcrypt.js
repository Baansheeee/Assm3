const bcrypt = require('bcryptjs');

const hashPassword = async function(password) {
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(password, saltRounds);
    return hashPass;
};

const comparePassword = async function(password, hashPass) {
    return bcrypt.compare(password, hashPass);
};
 
module.exports = { hashPassword, comparePassword };
