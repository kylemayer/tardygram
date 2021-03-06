const User = require('../models/User');
const { exchangeCodeForToken, getUserProfile } = require('../utils/github.js');

module.exports = class UserService {
  static async create(code) {
    const token = await exchangeCodeForToken(code);
    const profile = await getUserProfile(token);
    const user = await User.findByUser(profile.login);

    if(!user) {
      return User.insert({
        username: profile.login,
        avatarUrl: profile.avatar_url,
        caption: profile.caption,
        tags: profile.tags
      });
    } else {
      return user;
    }
  }
};
