const generateUniqueUsername = () => {
    return `user_${Date.now()}`;
}

module.exports = {
    generateUniqueUsername
};