import mongoose from 'mongoose';

const { Schema } = mongoose;
const kpi = new Schema(
    {
        name: String,
        target: String,
        completionPeriod: String,
        tracking: String,
        selfScore: Number,
        LineHeadScore: Number,
        hodScore:Number,
        thirdPartyScore: Number,
        weight: Number,
        Rating: Number,
        WeightbyRating: Number,
        comment:String
    })

const kra = new Schema(
    {
        name: String,
        kpis: [kpi]
    }
)
const kraArea = new Schema(
    {
        name: String,
        kras: [kra]
    }
)
const SubmittedCardModel = new Schema(
    {
        kraAreas: [kraArea],
        rating: Number,
        version: Number,
        department:String,
        unit: String,
        designation:String,
        evaluationPeriod: String,
        dateSubmited: {type:Date, default:Date.now()},
        owner: String,
        staff: String,
     
    }
)


export default mongoose.model('SubmittedScoreCard', SubmittedCardModel)