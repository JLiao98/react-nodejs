var express = require('express');
var router = express.Router();

// Set up the mongoDB connection
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Ben:526817244@513cluster-qiybs.mongodb.net/test?retryWrites=true";


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* Method for user login */
router.post('/login', function(req, res, next) {
    var loginUsername = req.body.loginUsername;     // get username input
    var loginPassword = req.body.loginPassword;     // get password input

    // Checks if either username or password is empty
    if(loginUsername.trim() === "" || loginPassword.trim() === "") {
        console.log("empty username or password");
        res.render('index', {loginMessage: 'empty username or password', signupMessage: ''});     // if empty, prints error message
        return;
    }
    console.log("-Login-\nusername: " + loginUsername + "\npassword: " + loginPassword);    // check, delete later

    // Connect to MongoDB
    var client = new MongoClient(url, { useNewUrlParser: true });   // start a new client
    client.connect(err => {     // establish the connection
    var collection = client.db("pictionary").collection("users");
    // perform actions on the collection object
//    var query = { name: loginUsername, password: loginPassword };
    var myobj = { name: loginUsername, password: loginPassword };
    collection.insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("inserted");
    });
//    collection.find(query).toArray(function(err, res) {
//        if (err) throw err;
//        console.log(res);
//    });
    client.close();     // close the connection
  });

    // TODO: for now, we only go back to original page, for future we will lead user to his/her home page
    res.render('index',{loginMessage: '', signupMessage: ''});
});

/* Method for user sign up */
router.post('/signup', function(req, res, next) {
    var signupUsername = req.body.signupUsername;     // get username input
    var signupEmail = req.body.signupEmail;     // get email input
    var signupPassword = req.body.signupPassword;     // get password input

    var flag = 0;

    // Checks if either username, email or password is empty
    if(signupUsername.trim() === "" || signupEmail.trim() === "" || signupPassword.trim() === "") {
        console.log("empty username, email or password");
        res.render('index', {loginMessage: '', signupMessage: 'empty username, email or password'});     // if empty, prints error message
        return;
    }
    console.log("-SignUp-\nusername: " + signupUsername + "\nemail: " + signupEmail + "\npassword: " + signupPassword);    // check, delete later

    // Connect to MongoDB
    var client = new MongoClient(url, { useNewUrlParser: true });   // start a new client
    client.connect(err => {     // establish the connection
        var collection = client.db("pictionary").collection("users");
        // perform actions on the collection object
        var query = { username: signupUsername };
        collection.find(query).toArray(function(err, ress) {
               if (err) throw err;
               if (ress.length !== 0){       // checks if the username has been taken
                   console.log("the username has been taken, please choose another username");
               }else{       // else, create the new user
                   var myobj = { username: signupUsername, password: signupPassword, email: signupEmail, wins: 0, gamePlayed: 0 };
                   collection.insertOne(myobj, function(err, res) {
                       if (err) throw err;
                       console.log("inserted");
                   });
               }
        });
        client.close();     // close the connection
    });

    //code before the pause
    setTimeout(function(){
        //do what you need here
        if(flag === 1){
            console.log("here");
            res.render('index', {loginMessage: '', signupMessage: 'the username has been taken, please choose another username'});     // if taken, prints error message
            return;
        }
    }, 3000);



    //console.log("wqwrqfqwf");
    // TODO: for now, we only go back to original page, for future we will lead user to his/her home page
    res.render('index',{loginMessage: '', signupMessage: ''});
});




module.exports = router;
