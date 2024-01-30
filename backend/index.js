const express = require('express')
const mongoose = require('mongoose')
const shortid =  require('shortid');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://admin:<password>@cluster0.imfrvq4.mongodb.net/url-shortner');

const urlSchema = new mongoose.Schema({
    shortid : String,
    redirectUrl : String,
    visitHistory : [{timestamp : { type : Number }}],

},
    { timestamps : true }
);

const urlDb = mongoose.model("urlDb" , urlSchema);


app.use(express.json());


app.post('/url',async (req,res)=>{
    const URL = req.body.url;

    if (!URL) {
        res.status(400).json({
            msg : "url is required"
        })
        return ;
    }

    const shortUrl = shortid();

    try {
        await urlDb.create({
            shortid : shortUrl,
            redirectUrl : URL,
            visitHistory : [],
        });

        // console.log(shortUrl)
        return res.json({ shortid : shortUrl });
    } catch (error) {
        res.status(400).json({
            msg : "Error while returning"
        })
    }
})

app.get('/url/list', async (req,res)=>{
    try {
        const response = await urlDb.find({});
        if (!response){
            res.status(400).json({
                msg : "no urls"
            });
        }

        const transformedUrls = response.map(url => ({
            shortid: url.shortid,
            redirectUrl: url.redirectUrl,
            clicks: url.visitHistory.length,
        }));


        return res.json(transformedUrls);
    } catch (error) {
        res.status(500).json({
            msg : "internal server error"
        })
    }
})


app.get('/:shortid', async (req, res) => {
    const shortId = req.params.shortid;

    try {
        let entry = await urlDb.findOneAndUpdate(
            { shortid: shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }
        );
            // console.log(entry)
        if (!entry) {
            entry = await urlDb.findOne({ shortid });
        }

        if (entry && entry.redirectUrl) {
            res.redirect("http://" + entry.redirectUrl);
        } else {
            res.status(404).json({
                msg: "Short URL not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
});


app.listen(3000,()=>{
    console.log("Server running");
})