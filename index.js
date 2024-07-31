// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

const regex =
  /([0-9]{1,4}|[a-z]{3,})[^a-z0-9]([0-9]{1,2}|[a-z]{3,})[^a-z0-9]([0-9]{1,4}|[a-z]{3,})/gi;

// your first API endpoint...
app.get("/api/:date", (req, res) => {
  let { date } = req.params;

  if (!isNaN(date)) {
    return res.json({
      unix: parseInt(date),
      utc: new Date(date * 1).toUTCString(),
    });
  }

  let utcDate = new Date(date);
  if (!isNaN(utcDate.getTime())) {
    return res.json({
      unix: utcDate.getTime(),
      utc: utcDate.toUTCString(),
    });
  } else {
    return res.json({
      error: "Invalid Date",
    });
  }
});

app.get("/api", (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
