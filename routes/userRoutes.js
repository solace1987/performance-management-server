import express from 'express';
import User from '../model/UserModel.js';
import errorCtrl from '../controller/errorController.js';
import { getUserByID, signIn, signout, requireSignin, hasAuthorization } from '../controller/authCtr.js'

// controller functions

/**
 * 1. Load user and append to req.
 */

const userRouter = express.Router();

userRouter.route('/users')
    .post(async (req, res) => {
        const user = new User(req.body);
        try {
            await user.save();
            res.status(201).json({ message: 'User sucessfully created' })
        }
        catch (err) {
            errorCtrl(err, res)
        }
    })
    .get((req, res) => {
        
        User.find((err, users) => {
            if (err) {
                return res.send(err);
            }
            else {
                console.log(users)
                return res.json(users)
            }
        }).select('firstname lastname unit email designation role  created ')

    });

userRouter.param('userId', getUserByID);

userRouter.route('/staffs/:userId').get(requireSignin, hasAuthorization, (req, res) => {
    
    User.find((err, users) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json(users)
        }
    }).select('firstname lastname unit email designation role  created scorecardId lineHead HOD')

});

userRouter.route('/user/:userId')
    .get((req, res) => {
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        return res.json(req.profile)
    })

    .put(async (req, res) => {

        try {
            let user = req.profile;
            
            Object.assign(user, req.body);
            user.update = Date.now()

            await user.save()
            req.profile.hashed_password = undefined;
            req.profile.salt = undefined;

            res.json({ message: "user updated" })
        } catch (err) {

            console.log(err)
        }
    })
    .delete(requireSignin, hasAuthorization, async (req, res) => {
        try {
            let user = req.profile;
            let deletedUser = await user.remove();
            deletedUser.salt = undefined;

            res.json(deletedUser);
        } catch (err) {

        }

    })

userRouter.route('/signin')
    .post(signIn)

userRouter.route('/signout')
    .get(signout)

export default userRouter;