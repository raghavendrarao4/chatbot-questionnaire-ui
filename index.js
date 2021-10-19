const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

//default route
app.get("/", (req, res) => {
  res.render("index"); // index refers to index.ejs
});

//post to login
app.post("/login", (req, res) => {
	
	var email = req.body.email;
	var credentials = req.body.pwd;
	
	//axios.get('http://localhost:8080/api/userprofile?email=' + email);
	if(credentials == "doctor") {
		res.redirect("/view");
	} else {
		res.render("failure");
	}
});

//Update questionnaire template
app.post("/update", (req, res) => {
	
	res.send("Update called");
	
});

//Add Questionnaire
app.post("/add", (req, res) => {
	
	let questions = [req.body.question1, req.body.question2, req.body.question3];
	let payload = {disease: req.body.disease, description: req.body.description, questions: questions};

	try {
		let response = axios.post(`http://localhost:8080/api/template`, payload);
		
		res.redirect("/view");
	} catch (error) {
		console.log(error);
		res.status(400).send("Error while getting list of questionnaire");
	}	
	
});


//view all questionnaire templates
app.get("/view", async (req, res) => {
	
	try {
		const questionnaire = await axios.get(`http://localhost:8080/api/template`);
		
		
		const qlist = questionnaire.data.map((questionnaire) => ({
			disease: questionnaire.disease,
			description: questionnaire.description,
			questions: questionnaire.questions,
		}));

		res.render("questionnaire", {qlist});
		
	} catch (error) {
		console.log(error);
		res.status(400).send("Error while getting list of questionnaire");
	}
});

app.get("/repos", async (req, res) => {
	const username = req.query.username || "raghavendrarao4";
	
	try {
		const result = await axios.get(`https://api.github.com/users/${username}/repos`);
		const repos = result.data.map((repo) => ({
			name: repo.name,
			url: repo.html_url,
			description: repo.description,
		}));

		res.render("repos", {repos});
	} catch (error) {
		console.log(error);
		res.status(400).send("Error while getting list of repositories");
	}
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});