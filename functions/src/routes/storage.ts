
import * as express from "express";
import * as admin from "firebase-admin";
import { authenticate } from "../middleware/authenticate";
import { type Request, type Response } from "express";

const router = express.Router();

// Custom middleware to check for admin role
const requireAdmin = async (req: any, res: express.Response, next: express.NextFunction) => {
    // In a real app, use custom claims. For now, email is fine for this demo.
    const adminEmail = 'divyahanssuperpower@gmail.com'; 
    if (req.user?.email !== adminEmail) {
        return res.status(403).json({ success: false, error: "Forbidden: Admin access required." });
    }
    next();
};

// All routes in this file require admin authentication
router.use(authenticate, requireAdmin);

// GET /storage/files/:projectId - Get all files for a specific project
router.get("/files/:projectId", async (req: Request, res: Response) => {
    try {
        const projectId = req.params.projectId;
        if (!projectId) {
            return res.status(400).json({ success: false, error: "Project ID is required." });
        }

        const db = admin.firestore();
        const filesSnapshot = await db.collection(`projects/${projectId}/files`)
            .orderBy("modified", "desc")
            .get();

        if (filesSnapshot.empty) {
            return res.status(200).json({ success: true, data: [] });
        }

        const files = filesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json({ success: true, data: files });

    } catch (error) {
        console.error(`Error fetching files for project ${req.params.projectId}:`, error);
        res.status(500).json({ success: false, error: "Internal Server Error while fetching files." });
    }
});

export default router;
