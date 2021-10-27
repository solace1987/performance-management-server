import express from "express";
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes.js";
import ScorecardRoutes from "./routes/scorecardRoutes.js";
import SubmittedScoreRoutes from "./routes/SubmittedCardRoute.js";
import cors from 'cors';


const app = express();
const db = mongoose.connect('mongodb://localhost/gpp-performance', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const port = process.env.PORT || 4000;
// const userRouter = userRoutes();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors(
    {
        origin:'http://192.168.88.86:3000',
       
        optionsSuccessStatus: 200,
        credentials : true
        }
));
app.use('/api', SubmittedScoreRoutes)
app.use('/api', userRoutes)
app.use('/api', ScorecardRoutes)



app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.listen(port, () => {
    console.log(`Running on Port ${port}`)
});

