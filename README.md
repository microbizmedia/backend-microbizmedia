Contact Form Database
This is a simple Node.js and MongoDB backend for storing contact form submissions. It allows users to submit messages through a form, which are then saved in a MongoDB database for easy retrieval.

Features
Handles contact form submissions
Stores data in MongoDB
Built with Node.js, Express.js, and Mongoose
Installation
Clone the repository:
sh
Copy
Edit
git clone <repo-url>
cd <project-folder>
Install dependencies:
sh
Copy
Edit
npm install
Set up environment variables in a .env file:
ini
Copy
Edit
MONGO_URI=your-mongodb-connection-string
PORT=5000
Start the server:
sh
Copy
Edit
npm start
Usage
Send a POST request to /api/contact with { name, email, message }
Data is saved in MongoDB
