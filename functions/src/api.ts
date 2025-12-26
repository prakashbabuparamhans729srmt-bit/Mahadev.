import * as express from "express";
import * as cors from "cors";
import projectsRouter from "./routes/projects";
import searchRouter from "./routes/search";
import healthRouter from "./routes/health";

const app = express();

// Automatically allow cross-origin requests from any origin
app.use(cors());

// --- API Routes ---
app.use("/projects", projectsRouter);
app.use("/search", searchRouter);
app.use("/health", healthRouter);


// Default route for health check
app.get("/", (req, res) => res.send("✅ API is running"));

export default app;
