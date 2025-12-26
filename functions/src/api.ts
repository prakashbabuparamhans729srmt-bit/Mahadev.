import * as express from "express";
import * as cors from "cors";
import projectsRouter from "./routes/projects";
import searchRouter from "./routes/search";

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// --- API Routes ---
app.use("/projects", projectsRouter);
app.use("/search", searchRouter);


// Default route for health check
app.get("/", (req, res) => res.send("✅ API is running"));

export default app;
