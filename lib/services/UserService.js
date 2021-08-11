const User = require('./models/User.js.js');
const { exchangeCodeForToken, getUserProfile } = require('./utils/github.js.js');

module.exports = class UserService {
  static async create(code) {
    const token = await exchangeCodeForToken(code);
    const profile = await getUserProfile(token);
    const user = await User.findByUser(profile.login);

    if(!user) {
      return User.insert({
        username: profile.login,
        avatarUrl: profile.avatar_url,
      });
    } else {
      return user;
    }
  }
};
