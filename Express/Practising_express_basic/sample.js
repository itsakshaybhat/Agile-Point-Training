const express = require('express');
const app = express() ;

app.use(express.json());

const objectAkshay = [
    {id:1, usn:"1VK22CS005", name: "AKSHAY", work: "SOFTWARE_ENGINEER"},
    {id:2, usn:"1VK22CS011", name: "ASHLESH", work: "BACKEND ENGINEER"}
];
let liveScore = { team: "VIT Strikers", runs: 158, wickets: 3, overs: 16.4 };


app.get('/match', (req, res) => {
    
    const htmlPage = `
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 100px;">
            <h1>🏏 Live T20 Score</h1>
            <h2 style="color: #FF5733;">${liveScore.team}</h2>
            <h1 style="font-size: 100px; margin: 10px 0;">${liveScore.runs} / ${liveScore.wickets}</h1>
            <p style="font-size: 24px; color: #555;">Overs: ${liveScore.overs}</p>
            <button onclick="location.reload()" style="padding: 10px 20px; font-size: 18px; cursor: pointer;">Refresh Score</button>
        </div>
    `;
    res.send(htmlPage);
});

app.post('/update-score',(req,res)=>{
    liveScore.runs = req.body.runs;
    liveScore.wickets = req.body.wickets;
    liveScore.overs = req.body.overs;
    res.json({message:"Score card updated successfully!", currentScore: liveScore});
});


app.listen(2000, ()=>{
    console.log("ONd sala browser noodu, next postman sari battena 2000 li");
});