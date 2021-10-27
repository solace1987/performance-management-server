import express from 'express';
import ScoreCard from '../model/scorecardModel.js';
import errorCtrl from '../controller/errorController.js';
import { requireSignin, hasAuthorization,getScoreCardByID } from '../controller/authCtr.js'



const scorecardRouter = express.Router();

scorecardRouter.route('/scorecard')
    .post(requireSignin, async (req, res) => {

        const Scorecard = new ScoreCard(req.body);
        try {
            await Scorecard.save();
            res.status(201).json({ message: 'Scorecard sucessfully created' })
        }
        catch (err) {
            errorCtrl(err, res)
        }
    })

    .get(requireSignin, async (req, res) => {

        ScoreCard.find((err, score) => {
            if (err) {
                return res.send(err);
            }
            else {
                return res.json(score)
            }
        }
        )
    }
    )

    scorecardRouter.param('scorecardId', getScoreCardByID);
    scorecardRouter.route('/scorecard/:scorecardId')
    .get((req, res) => {
        
        return res.json(req.profile)
    })

    .put(async (req, res) => {

        try {
            let scoreCard = req.profile;
            
            Object.assign(scoreCard, req.body);
           

            await scoreCard.save()
            

            res.json({ message: "Score card updated" })
        } catch (err) {

            console.log(err)
        }
    })
    .delete(requireSignin, async (req, res) => {
        try {
            let scoreCard = req.profile;
            let deletedScorecard = await scoreCard.remove();
            deletedScorecard.salt = undefined;

            res.json(deletedScorecard);
        } catch (err) {

        }

    })





export default scorecardRouter;