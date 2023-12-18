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

    let str = matchdata.match_url;
    let live_url = str.replace('www', 'm');

    axios({
        method: 'GET',
        url: live_url,
        headers: {
            'User-Agent': rua
        }
    }).then(function(response) {

        

        let main_credit = "`\n🚀 *_Buckle up ${name}, Welcome To Mr-Malik! We're going on an adventure!_* 🚀\n\n╭───❮ *MR-Malik* ❯
│ *MR-Malik*  Menu Ⓜ
│ 
│ _${usedPrefix}hi_
│
╰─────────────⦁
\n *Follow me on Facebook:*
facebook.com/NasrullahMachi\n

╭─❮ *Tools List* ❯
│ 🔹 *${usedPrefix}QURAN*
│ 🔹 *${usedPrefix}CHATGPT*
│ 🔹 *${usedPrefix}BARD*
│ 🔹 *${usedPrefix}BING*
│ 🔹 *${usedPrefix}IMGAI*
│ 🔹 *${usedPrefix}REMOVEBG*
│ 🔹 *${usedPrefix}LOGO*
│ 🔹 *${usedPrefix}GEO*
│ 🔹 *${usedPrefix}TOANIME*
│ 🔹 *${usedPrefix}TOMP3*
│ 🔹 *${usedPrefix}TOIMG*
│ 🔹 *${usedPrefix}TOVID*
╰─────────────⦁

${readMore}
╭───❮ *Download* ❯
│ 🔹 *${usedPrefix}YTS*
│ 🔹 *${usedPrefix}yts2*
│ 🔹 *${usedPrefix}play*
│ 🔹 *${usedPrefix}play2*
│ 🔹 *${usedPrefix}play3*
│ 🔹 *${usedPrefix}play4*
│ 🔹 *${usedPrefix}playdoc*
│ 🔹 *${usedPrefix}playdoc2*
│ 🔹 *${usedPrefix}video*
│ 🔹 *${usedPrefix}video2* (soon)
│ 🔹 *${usedPrefix}insta* (soon)
│ 🔹 *${usedPrefix}img*
│ 🔹 *${usedPrefix}pinterest*
│ 🔹 *${usedPrefix}mediafire*
│ 🔹 *${usedPrefix}gdrive*
│ 🔹 *${usedPrefix}twitter*
│ 🔹 *${usedPrefix}tiktok*
│ 🔹 *${usedPrefix}tiktokstalk*
│ 🔹 *${usedPrefix}fb*
│ 🔹 *${usedPrefix}fb2*
│ 🔹 *${usedPrefix}apk*
│ 🔹 *${usedPrefix}modapk*
│ 🔹 *${usedPrefix}cricket*
│ 🔹 *${usedPrefix}weather*
│ 🔹 *${usedPrefix}meme*
╰─────────────⦁

╭───❮ *Convrt Audio* ❯
│ _${usedPrefix}bass_
│ _${usedPrefix}blown_
│ _${usedPrefix}deep_
│ _${usedPrefix}earrape_
│ _${usedPrefix}fat_
│ _${usedPrefix}fast_
│ _${usedPrefix}nightcore_
│ _${usedPrefix}reverse_
│ _${usedPrefix}squrrel_
│ _${usedPrefix}slow_
╰─────────────⦁


╭───❮ *Tools Sticker* ❯
│ _${usedPrefix}sticker_
│ _${usedPrefix}take_
│ _${usedPrefix}smaker_
│ _${usedPrefix}getsticker_
│ _${usedPrefix}emix_
│ _${usedPrefix}attp_
╰─────────────⦁

╭───❮ *Other Tools* ❯
│ _${usedPrefix}autosticker_
│ _${usedPrefix}whatmusic_
│ _${usedPrefix}tempmail_
│ _${usedPrefix}checkmail_
│ _${usedPrefix}pokedex_
│ _${usedPrefix}calc_
│ _${usedPrefix}google_
│ _${usedPrefix}lyrics_
│ _${usedPrefix}readmore_
│ _${usedPrefix}ssweb_
│ _${usedPrefix}tts_
│ _${usedPrefix}translate_
│ _${usedPrefix}wiki_
│ _${usedPrefix}nowa_
│ _${usedPrefix}qrmaker_
│ _${usedPrefix}true_
│ _${usedPrefix}fancy_
│ _${usedPrefix}itunes_
╰─────────────⦁


╭❮  *M-r Malik* ❯
│        🦹‍♂️
│ 💡 Created By 
│ 📎 *NASRULLAH*
╰────────────⦁`";
        
        var main_menu = ({
            main_credit: main_credit || "MR-MALIK-MD"
        });

        res.send(JSON.stringify(main_menu, null, 0));

    }).catch(function(error) {
        if (!error.response) {
            res.json(errormsg());
        } else {
            console.log('Something Went Wrong - Enter the Correct API URL');
            res.json(errormsg());
        }
    });

});

module.exports = router;
