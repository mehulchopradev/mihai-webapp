const UserDao = require('../dao/user-dao');

exports.createUser = async function ({ username, password, gender }) {
    const userDao = new UserDao();
    await userDao.insertUser(username, password, gender);
    return username;
}

exports.authenticate = async function ({ username, password }) {
    const userDao = new UserDao();
    const user = await userDao.getUserByUsernameAndPassword(username, password);
    return user;
}

exports.getUserByUsername = async function (username) {
    const userDao = new UserDao();
    const user = await userDao.getUserByUsername(username);
    return user;
}