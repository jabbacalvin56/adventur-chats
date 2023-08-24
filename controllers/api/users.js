const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Profile = require("../../models/profile");
const Location = require("../../models/location");

module.exports = {
  create,
  login,
  checkToken,
};

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const profile = await Profile.findOne({ username: req.body.username });

    if (user) {
      res.status(500).json({ error: "Email already in use." });
    } else if (profile) {
      res.status(500).json({ error: "Username not available." });
    } else {
      const newLocation = await Location.create(req.body);
      req.body.homeBase = newLocation._id;
      const newProfile = await Profile.create(req.body);
      req.body.profile = newProfile._id;
      const newUser = await User.create(req.body);
      const token = await createJWT({
        email: newUser.email,
        useUsername: newProfile.useUsername,
        username: newProfile.username,
        firstName: newProfile.firstName,
        lastName: newProfile.lastName,
        profilePic: newProfile.profilePic,
      });
      res.status(200).json(token);
    }
  } catch (err) {
    res.status(500).json({ error: "Error creating your user." });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const profile = await Profile.findOne({ _id: user.profile });
    console.log(profile);
    const token = createJWT({
      email: user.email,
      useUsername: profile.useUsername,
      username: profile.username,
      firstName: profile.firstName,
      lastName: profile.lastName,
      profilePic: profile.profilePic,
    });

    res.json(token);
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
