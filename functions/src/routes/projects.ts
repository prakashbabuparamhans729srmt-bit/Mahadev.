import * as express from "express";
import * as admin from "firebase-admin";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();


// Custom middleware to check for admin role
const requireAdmin = async (req: any, res: express.Response, next: express.NextFunction) => {
    const adminEmail = 'divyahanssuperpower@gmail.com';
    if (req.user.email !== adminEmail) {
        return res.status(403).json({ error: "Forbidden: Admin access required." });
    }
    next();
};

// GET /projects/all - Get all projects for all users (ADMIN ONLY)
router.get("/all", authenticate, requireAdmin, async (req, res) => {
    try {
        const db = admin.firestore();

        // Get all projects
        const projectsSnapshot = await db.collection("projects").get();
        if (projectsSnapshot.empty) {
            return res.status(200).json({ success: true, data: [] });
        }

        // Get all clients to enrich project data
        const clientsSnapshot = await db.collection("clients").get();
        const clientsMap = new Map(clientsSnapshot.docs.map(doc => [doc.id, doc.data()]));

        const projects = projectsSnapshot.docs.map(doc => {
            const projectData = doc.data();
            const clientData = clientsMap.get(projectData.clientId);
            return {
                id: doc.id,
                ...projectData,
                client: {
                    name: clientData?.companyName || `${clientData?.firstName} ${clientData?.lastName}`,
                    email: clientData?.email
                }
            };
        });

        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        console.error("Error fetching all projects:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Middleware to ensure user is authenticated for all subsequent project routes
router.use(authenticate);

// GET /projects - Get all projects for the authenticated user
router.get("/", async (req: any, res) => {
  try {
    const userId = req.user.uid;
    const db = admin.firestore();

    // Securely query for projects where the user is the client
    const projectsSnapshot = await db.collection("projects").where("clientId", "==", userId).get();
    
    if (projectsSnapshot.empty) {
      return res.status(200).json({ success: true, data: [] });
    }

    const projects = projectsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// GET /projects/:id - Get a single project
router.get("/:id", async (req: any, res) => {
  try {
    const userId = req.user.uid;
    const projectId = req.params.id;
    const db = admin.firestore();

    const projectRef = db.collection("projects").doc(projectId);
    const doc = await projectRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Project not found" });
    }

    const projectData = doc.data();
    
    // Admin check: Admin can access any project
    const isAdmin = req.user.email === 'divyahanssuperpower@gmail.com';

    // Security Check: Ensure the user is the owner of the project OR is an admin
    if (projectData?.clientId !== userId && !isAdmin) {
      return res.status(403).json({ error: "Forbidden: You do not have access to this project." });
    }

    res.status(200).json({ success: true, data: { id: doc.id, ...projectData } });
  } catch (error) {
    console.error(`Error fetching project ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// You can add POST, PUT, DELETE routes here in the future
// For example, to create a project:
// router.post("/", async (req: any, res) => { ... });

export default router;
