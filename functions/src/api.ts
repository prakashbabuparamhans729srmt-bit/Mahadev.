import * as express from "express";
import * as cors from "cors";
import projectsRouter from "./routes/projects";
import searchRouter from "./routes/search";
import healthRouter from "./routes/health";

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'https://mahadev-app.vercel.app', // Your Vercel production URL
];

// Automatically allow cross-origin requests from any origin
app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));


// --- API Routes ---
app.use("/projects", projectsRouter);
app.use("/search", searchRouter);
app.use("/health", healthRouter);


// Default route for health check
app.get("/", (req, res) => res.send("✅ API is running"));

export default app;
