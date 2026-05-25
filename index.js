import express from "express";
// import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorised = false;
// By default users are not Authorised because they need Password to login...

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// If I don't want to use body-parser or install at all, I can use Express. Because [body-parser] is incorporated as a part of [Express].
// - Take out the import bodyParser ***** or comment it out and just use Express
// - But best Practice is to use BodyParser and Express together.


function passwordCheck(req, res, next) {
    const password = req.body["password"];  
    if (password === "ILoveProgramming") {
        userIsAuthorised = true;
    }
    next();
}
app.use(passwordCheck);
// The passward targetted here: const password = req.body["password"];  is targetted 
//  in the <input name="password">
//  req.body is used to access the data user/client passed in through the HTTP request handlers

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
    // res.redirect("/")
});

app.post("/check", (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
        // res.redirect("/")
    }
});
//  If Athenticated OR  Authorised, send the Secret.html page, if not, send back the index.html page.


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// To see how the final website should work, run "node solution.js".
// Make sure you have installed all the dependencies with "npm i".
// The password is ILoveProgramming
 

