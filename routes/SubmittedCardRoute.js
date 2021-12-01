import express from 'express';
import SubmittedCard from '../model/submittedCardModel.js';
import errorCtrl from '../controller/errorController.js';
import { requireSignin,getSubmittedCardByID  } from '../controller/authCtr.js'



const submittedcardRouter = express.Router();

submittedcardRouter.route('/allsubmitted')
    .get(requireSignin,async (req,res)=>{
        const submittedCard = new SubmittedCard(req.body);
        console.log(req.query)
    })
submittedcardRouter.route('/submittedcard')
    .post(requireSignin, async (req, res) => {

        const submittedCard = new SubmittedCard(req.body);
        try {
            await submittedCard.save();
            res.status(201).json({ message: 'Scorecard sucessfully created' })
        }
        catch (err) {
            errorCtrl(err, res)
        }
    })

    .get(requireSignin, async (req, res) => {

        SubmittedCard.find((err, score) => {
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

    submittedcardRouter.param('submittedcardId', getSubmittedCardByID);
    submittedcardRouter.route('/submittedcard/:submittedcardId')
    .get((req, res) => {
        
        return res.json(req.profile)
    })

    .put(async (req, res) => {

        try {
            let submittedCard = req.profile;
            
            Object.assign(submittedCard, req.body);
           

            await submittedCard.save()
            

            res.json({ message: "Score card updated" })
        } catch (err) {

            console.log(err)
        }
    })
    .delete(requireSignin, async (req, res) => {
        try {
            let submittedCard = req.profile;
            let deletedScorecard = await submittedCard.remove();
            res.json(deletedScorecard);
        } catch (err) {

        }

    })





export default submittedcardRouter;