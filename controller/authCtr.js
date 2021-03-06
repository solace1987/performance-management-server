import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import User from "../model/UserModel.js";
import ScoreCard from "../model/scorecardModel.js";
import SubmittedCard from "../model/submittedCardModel.js"
import {kpiValueMapper} from "../controller/helper.js"
/**
 * 1. Load user and append to req.
 */
const getUserByID = async (req, res, next, id) => {
  const body = req.body;
  try {
    let user = await User.findById(id);
   
    if (!user) {
      return res.status("400").json({
        error: "User not found",
      });
    }
    req.body = body;
    req.profile = user;

   
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

/**
 * 2. function for signing in
 */
const signIn = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (!user)
      return res.status("401").json({
        error: "User account not found",
      });

    if (!user.authenticate(req.body.password)) {
      return res.status("401").send({
        error: "Email and password don't match.",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      "hufhsaduhughs!!@"
    );

    res.cookie("t", token, { expire: new Date() + 9999 });
          
    return res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        department: user.department,
        role: user.role,
        scorecardId: user.scorecardId,
        lastName:user.lastname,
        firstName:user.firstname
      },
    });
  } catch (err) {
    console.log(err);
    return res.status("401").json({
      error: "Could not sign in",
    });
  }
};
/**
 * 3. function for signing in
 */
const signout = (req, res) => {
  res.clearCookie("t");

  return res.status("200").json({
    message: "signed out",
  });
};
/**
 * 4. middleware for confirming signin
 */
const requireSignin = expressJwt({
  secret: "hufhsaduhughs!!@",
  algorithms: ["HS256"],
  userProperty: "auth",
});

/**
 * 3. middleware to confirm authorization
 */

const hasAuthorization = (req, res, next) => {
 
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }

  next();
};

const getScoreCardByID = async (req, res, next, id) => {
  try {
    let scoreCard = await ScoreCard.find({ _id: id }, { _id: 0 });

    if (!scoreCard) {
      return res.status("400").json({
        error: "Score Card not found",
      });
    }

    req.profile = scoreCard[0];

    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve Score Cards",
    });
  }
};

const getSubmittedCardByID = async (req, res, next, id) => {
  try {
    
    let submittedCard = await SubmittedCard.findById(id);

    if (!submittedCard) {
      return res.status("400").json({
        error: "Score Card not found",
      });
    }

    req.profile = submittedCard;

    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve Score Card",
    });
  }
};

const getUser = async (id) => {
  try {
    let user = await User.findById(id);

    if (!user) {
      return {};
    }

    return user;
  } catch (err) {
    console.log("Could not retrieve user");
  }
};

const getUserInfo = async (query) => {
  try {
    let user = await User.find(query);

    if (!user) {
      return {};
    }

    return user;
  } catch (err) {
    console.log("Could not retrieve user");
  }
};

export {
  getUserByID,
  signIn,
  signout,
  requireSignin,
  hasAuthorization,
  getScoreCardByID,
  getSubmittedCardByID,
  getUser,
  getUserInfo
};
