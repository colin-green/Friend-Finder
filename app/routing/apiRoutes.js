var friendData = require("../data/friends.js");

module.exports = function(app) {
    
app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out the survey... this data is then sent to the server...
  // Then the server saves the data to the friendData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {

    // req.body is available since we're using the body parsing middleware
    var newUser = req.body;

    // Default best match is the first friend in the array
    var bestMatchIndex = 0;

    // 40 is the maximum difference anyone can have
    var maximumDifference = 40;

    // For each friend in the friendData array...
    for (let i = 0; i < friendData.length; i++) {
      
      // set the total difference to 0
      var totalDifference = 0;
      
      // go through each of that friend's scores
      for (let j = 0; j < friendData[i].scores.length; j++) {
        
        // and add the individual difference to the total difference
        var difference = Math.abs(Number(newUser.scores[j]) - Number(friendData[i].scores[j]));
        totalDifference += difference;
        
      }

      // If their resulting difference is less than the previous maximum...
      if (totalDifference < maximumDifference) {

        // make it the new best match
        bestMatchIndex = i;

        // and also make it the new maximum to beat
        maximumDifference = totalDifference;
      }
      
    }

      // Finally, push the new user to the friendData array (after converting the scores to numbers)
      newUser.scores = newUser.scores.map(Number);
      friendData.push(newUser);
      // Send back a json of the best match
      res.json(friendData[bestMatchIndex]);
  });

  // Clears the friendData array
  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    friendData.length = 0;

    res.json({ ok: true });
  });
};