const express = require('express');
const env = require('dotenv');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 5000;
const userRouter = require('./routers/userRouter');
const experienceRouter = require('./routers/experienceRouter');

app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user",userRouter);
app.use("/experience",experienceRouter);

app.listen(PORT,function(err){
    if(err) console.log(err);
    console.log("server listening on port",PORT);
})



