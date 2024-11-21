// import express from "express"; // Importing Express.js
// import dotenv from "dotenv"; // Importing dotenv to load environment variables
// import cookieParser from "cookie-parser"; // Importing cookie-parser to handle cookies
// import cors from "cors"; // Importing CORS for enabling cross-origin requests
// import { DataBaseConnect } from "./database/dataBaseConnection.js"; // Importing database connection function
// import sequenceRoutes from "./routes/sequence/sequence.Routes.js"; // Importing routes related to email sequence
// import authRoutes from "./routes/auth/auth.Routes.js"; // Importing authentication-related routes

// dotenv.config(); // Load environment variables from the .env file
// DataBaseConnect(); // Connect to the database

// const app = express(); // Creating an Express application

// const PORT = process.env.PORT || 8000; // Setting the port from environment variable or default to 8000

// // CORS Configuration
// const corsOptions = {
//   origin: "https://vinitf.vercel.app", // Allowing requests only from this frontend origin
//   credentials: true, // Allowing cookies to be sent along with the request
//   methods: "GET,POST,PUT,DELETE", // Enabling specific HTTP methods
// };

// app.use(express.json()); // Middleware to parse JSON request bodies
// app.use(cookieParser()); // Middleware to parse cookies from requests
// app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
// app.use(cors(corsOptions)); // Enabling CORS with the defined options

// // Routes
// app.use("/api/v1/email", sequenceRoutes); // API route for handling email-related functionality
// app.use("/api/v1/auth", authRoutes); // API route for authentication functionality

// // Start the server and listen on the defined port
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`); // Log a message when the server is running
// });




import express from "express"; // Importing Express.js
import dotenv from "dotenv"; // Importing dotenv to load environment variables
import cookieParser from "cookie-parser"; // Importing cookie-parser to handle cookies
import cors from "cors"; // Importing CORS for enabling cross-origin requests
import { DataBaseConnect } from "./database/dataBaseConnection.js"; // Importing database connection function
import sequenceRoutes from "./routes/sequence/sequence.Routes.js"; // Importing routes related to email sequence
import authRoutes from "./routes/auth/auth.Routes.js"; // Importing authentication-related routes

// Load environment variables from .env file
dotenv.config();

// Connect to the database
DataBaseConnect();

// Initialize Express app
const app = express();

// Define the port
const PORT = process.env.PORT || 8000;

// CORS Configuration
const corsOptions = {
  origin: "https://vinitf.vercel.app", // Allow requests only from this frontend origin
  credentials: true, // Allow cookies and credentials
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

// Middleware Configuration
app.use(cors(corsOptions)); // Enable CORS with the configured options
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Handle Preflight Requests
app.options("*", cors(corsOptions));

// API Routes
app.use("/api/v1/email", sequenceRoutes); // Routes for email functionality
app.use("/api/v1/auth", authRoutes); // Routes for authentication

// 404 Handler for Unknown Routes
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found. Please check the URL and try again.",
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err.message);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`); // Log when the server starts
});
