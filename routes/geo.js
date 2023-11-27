const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const randomUseragent = require('random-useragent');
const apicache = require("apicache");
const axios = require('axios');
const { rateLimit } = require('express-rate-limit');
const rua = randomUseragent.getRandom();
const cache = apicache.middleware
const matchdata = require('../utlis/app.json');
const { dummydata } = require('../utlis/error.js');
const { errormsg } = require('../utlis/msg.js');

const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 40,
    handler: function (req, res) {
        return res.status(429).json(
          dummydata()
        )
    }
})

router.get('/', cache('2 minutes'), apiRequestLimiter, function(req, res) {
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');
    res.setHeader('Content-Type', 'application/json');

    const match_url = req.query.url;

    let str = match_url || '';
    let live_url = str;

    axios({
        method: 'GET',
        url: live_url,
        headers: {
            'User-Agent': rua
        }
    }).then(function(response) {

        $ = cheerio.load(response.data);

        var newsb = $('div[class="heading"]').eq(0).text();
        var newsc = $('div[class="heading"]').eq(1).text();
        var newsd = $('div[class="heading"]').eq(2).text();
        var newse = $('div[class="heading"]').eq(3).text();
        var newsf = $('div[class="heading"]').eq(4).text();
        var newsg = $('div[class="heading"]').eq(5).text();
        var newsh = $('div[class="heading"]').eq(6).text();
        var newsi = $('div[class="heading"]').eq(7).text();
        var newsj = $('div[class="heading"]').eq(8).text();
        var newsk = $('div[class="heading"]').eq(9).text();
        
        
        
        var livescore = ({
            newsb: newsb || "Data Not Found",
            newsc: newsc || "Data Not Found",
            newsd: newsd || "Data Not Found",
            newse: newse || "Data Not Found",
            newsf: newsf || "Data Not Found",
            newsg: newsg || "Data Not Found",
            newsh: newsh || "Data Not Found",
            newsi: newsi || "Data Not Found",
            newsj: newsj || "Data Not Found",
            newsk: newsk || "Data Not Found"
          
        });

        res.send(JSON.stringify(livescore, null, 0));

    }).catch(function(error) {
        if (!error.response) {
            res.json(errormsg());
        } else {
            res.json(errormsg());
        }
    });

});

module.exports = router;
