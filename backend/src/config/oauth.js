const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const UserRepository = require("../domain/repositories/user.repository");
const AuthService = require("../domain/services/auth.service");

// Cấu hình Google OAuth
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/api/auth/google/callback",
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Kiểm tra xem user đã tồn tại chưa
				let user = await UserRepository.findByEmail(profile.emails[0].value);

				if (!user) {
					// Tạo user mới nếu chưa tồn tại
					user = await AuthService.registerWithOAuth({
						email: profile.emails[0].value,
						fullName: profile.displayName,
						avatar: profile.photos[0].value,
						provider: "google",
						providerId: profile.id,
					});
				}

				return done(null, user);
			} catch (error) {
				return done(error, null);
			}
		}
	)
);

// Cấu hình GitHub OAuth
passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: "/api/auth/github/callback",
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Kiểm tra xem user đã tồn tại chưa
				let user = await UserRepository.findByEmail(profile.emails[0].value);

				if (!user) {
					// Tạo user mới nếu chưa tồn tại
					user = await AuthService.registerWithOAuth({
						email: profile.emails[0].value,
						fullName: profile.displayName,
						avatar: profile.photos[0].value,
						provider: "github",
						providerId: profile.id,
					});
				}

				return done(null, user);
			} catch (error) {
				return done(error, null);
			}
		}
	)
);

// Serialize user cho session
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Deserialize user từ session
passport.deserializeUser(async (id, done) => {
	try {
		const user = await UserRepository.findById(id);
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});

module.exports = passport;
