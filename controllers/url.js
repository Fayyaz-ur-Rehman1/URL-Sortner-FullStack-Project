const Url = require("../models/url");
const shortId = require("shortid");

// create shortid
async function handleGenrateNewUrls(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is Required" });
    const shortID = shortId();

    Url.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    res.render("home", {
        id: shortID,
    })
    // res.json({ id: shortID });
}

// redirect url
async function redirectUrlWtihShortId(req, res) {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate({
        shortId
    },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now().toLocaleString()
                }
            }
        });

    res.redirect(entry.redirectURL);
}

// analytics url clicks time
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory, })
}

module.exports = {
    handleGenrateNewUrls,
    redirectUrlWtihShortId,
    handleGetAnalytics,
}