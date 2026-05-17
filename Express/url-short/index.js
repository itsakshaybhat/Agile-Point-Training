const express = require('express');
const path = require('node:path');
const connectToMongoDB = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const app = express();

const PORT = 8001;
const mongoConnect = 'mongodb://localhost:27017/short-url'

connectToMongoDB(mongoConnect)
    .then(()=> console.log("MongoDB connected"))
    .catch((error)=> console.error("Error is", error));

app.set("view engine", "ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/test', async(req, res)=>{
    const allUrls = await URL.find({});
    return res.render('home',{
        urls: allUrls,
    });
})

app.use('/url', urlRoute);

app.get('/:shortId', async(req,res)=> {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId},{$push:{
        visitHistory: {
            timestamp : Date.now(),
        },
    }})
    res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=> console.log(`Server started at PORT: ${PORT}`));

