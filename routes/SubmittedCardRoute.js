import express from "express";
import SubmittedCard from "../model/submittedCardModel.js";
import errorCtrl from "../controller/errorController.js";
import {
  requireSignin,
  getSubmittedCardByID,
  getUser,
} from "../controller/authCtr.js";
import { sendMailer } from "../controller/mailer.js";
import User from '../model/UserModel.js';
import {kpiValueMapper} from "../controller/helper.js"


const submittedcardRouter = express.Router();

submittedcardRouter.route("/allsubmitted").get(async (req, res) => {
  SubmittedCard.find({ owner: req.query.owner }, (err, score) => {
    if (err) {
      return res.send(err);
    } else {

      return res.json(score);
      
    }
  });
});

submittedcardRouter.route("/submitted-summary").get(async (req, res) =>{
  let graphData=[];
  const year = new Date().getFullYear();
  const query= req.query;
  
   SubmittedCard.find({owner: query.owner, dateSubmited:{$gte:new Date(year, 0,1),$lte: new Date(year+1,0,31)}},
    (err,score)=>{
      if (err) {
        return res.send(err);
      } else {
       graphData = score.map((data)=>{
         let period= data.evaluationPeriod
         let year = data.evaluationPeriod.substring(period.length - 4);
         let month =period.substring(0,3);
         
         return {
                  graph:{x:`${month} ${year}`,y:data.rating},
                  map:kpiValueMapper(data.kraAreas)
                }
       })
      return res.json(graphData)
      }

    })
    ;
});

submittedcardRouter.route("/staffcard")
  .get(requireSignin, async (req, res)=>{
    
        
    const query= req.query;
      const year = new Date().getFullYear();
      const correctMonth= (month)=>{
       return month!=12?month:0;
      }
      const month = correctMonth(Number(query.month)+1);
      const acessor = query.acessor;
      const access = ()=>{
        if(query.role=="linehead"){
          return {lineHead:acessor}
        }
        else if(query.role==="HOD"){
          return {HOD:acessor}
        }
      }
      let staff=[]
      User.find(access(),(err,users)=>{

        if(err){
          console.log(err)
        }
        else{
           
        staff= users.map(user=>(user._id.toString()));

        SubmittedCard.find(
          {dateSubmited:{$gte:new Date(year, month,1),$lte: new Date(year,month,25)}, owner:{$in:staff}}, 
          (err,score)=>{
            if (err) {
              return res.send(err);
            } else {
              return res.json(score);
            }
  
          })
       
        }
      })

      
     
      

  })


submittedcardRouter
  .route("/submittedcard")
  .post(requireSignin, async (req, res) => {
    const submittedCard = new SubmittedCard(req.body);
    try {
      const sender = await getUser(req.body.owner);
      
    
     await submittedCard.save();

      sendMailer(sender.lastname, sender.firstname, "HOD", sender.unit,`${sender.HOD}`, `${sender.lineHead}`);
      sendMailer(sender.lastname, sender.firstname, "LineHead", sender.unit,`${sender.lineHead}`);
      
      res.status(201).json({ message: "Scorecard sucessfully created" });
    } catch (err) {
      errorCtrl(err, res);
    }
  })

  .get(requireSignin, async (req, res) => {
    SubmittedCard.find((err, score) => {
      if (err) {
        return res.send(err);
      } else {
        const query = req.query;
        const correctMonth= (month)=>{
          return month!=11?(month+1):0;
         }
        const year = new Date().getFullYear();
        const month = correctMonth(Number(query.month));
       
        SubmittedCard.find(
          {dateSubmited:{$gte:new Date(year, month,1),$lte: new Date(year,month,25)}}, 
          (err,score)=>{
            if (err) {
              return res.send(err);
            } else {
              
              return res.json(score);
            }
  
          })
      }
    });
  });

submittedcardRouter.param("submittedcardId", getSubmittedCardByID);
submittedcardRouter
  .route("/submittedcard/:submittedcardId")
  .get((req, res) => {
    return res.json(req.profile);
  })  

  .put(requireSignin, async (req, res) => {
    try {
      let submittedCard = req.profile;
    console.log(req.body)
      Object.assign(submittedCard, req.body);

      await submittedCard.save(); 

      res.json({ message: "Score card updated" });
    } catch (err) {
      console.log(err);
    }
  })
  .delete(requireSignin, async (req, res) => {
    try {
      let submittedCard = req.profile;
      let deletedScorecard = await submittedCard.remove();
      res.json(deletedScorecard);
    } catch (err) {}
  });

export default submittedcardRouter;