# chatbot-questionnaire-ui
Questionnaire Web interface for the chatbot app

# Pre-requisite
This application consumes REST API exposed by 'chatbot-backend' app [https://github.com/raghavendrarao4/chatbot-backend] and Mongo DB backend

# To run the application
1. Clone the git repository
2. Install npm packages - axios, ejs, body-parser, express
3. 'nodemon' package is optional for development
4. Run 'node index.js' from command prompt
5. View application endpoint at localhost:3000

App is verified locally, yet to be deployed & tested on cloud environment

Note: 
 a. Current version of the UI needs user profile to be created on the backend (use 'user profile' API exposed from the backend.
 b. Default password is set to 'doctor'. Login verification is in-progress, will be integrated shortly.

# Tech stack
Express, Mongo DB, EJS, Axios