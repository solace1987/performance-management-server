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
        thirdPartyScore: Number,
        weight: Number,
        Rating: Number,
        WeightbyRating: Number
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
const ScorecardModel = new Schema(
    {
        kraAreas: [kraArea],
        rating: Number,
        version: Number,
        department:String,
        unit: String,
        designation:String,
        evaluationPeriod: Date,
        dateCreated: Date,
     
    }
)





export default mongoose.model('scoreCard', ScorecardModel)

