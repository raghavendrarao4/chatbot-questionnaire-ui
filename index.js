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

//Post to login
app.post("/login", async (req, res) => {
	
	var email = req.body.email;
	var credentials = req.body.pwd;
	
	let result = await axios.get('http://localhost:8080/api/userprofile?email=' + email);
	
	if(credentials == "doctor" && result.data != "") {
		res.redirect("/view");
	} else {
		res.render("failure");
	}
});

//Update questionnaire template
app.post("/updateTemplate", (req, res) => {

	let updateClick = req.body.update;
	let deleteClick = req.body.delete;
	let questions = req.body.questions;
	let payload = { questions: questions};
	let id = req.body.questionnaireId;
	
	try {
		if(updateClick) {
			let response = axios.put(`http://localhost:8080/api/template/${id}`, payload);
		}
		
		if(deleteClick) {
			let response = axios.delete(`http://localhost:8080/api/template/${id}`);
		}
		
		res.redirect("/view");
	} catch (error) {
		console.log(error);
		res.status(400).send("Error during questionnaire update");
	}
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


//View all questionnaire templates
app.get("/view", async (req, res) => {
	
	try {
		const questionnaire = await axios.get(`http://localhost:8080/api/template`);
		
		const qlist = questionnaire.data.map((questionnaire) => ({
			id: questionnaire.id,
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

app.listen(3000, () => {
  console.log("server started on port 3000");
});