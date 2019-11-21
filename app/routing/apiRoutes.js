var friendData = require("../data/friends.js");

module.exports = function(app) {
    
app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
      friendData.push(req.body);
      // res.json(true);
      res.json({reqBody: req.body});
  });

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    friendData.length = 0;

    res.json({ ok: true });
  });
};