import * as express from "express";
import * as admin from "firebase-admin";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.use(authenticate);

// A very simple search implementation.
// For a production app, use a dedicated search service like Algolia or Elasticsearch.
router.get("/", async (req: any, res) => {
    try {
        const userId = req.user.uid;
        const query = (req.query.q as string || "").toLowerCase();
        const db = admin.firestore();

        if (!query) {
            return res.status(400).json({ error: "Search query is required." });
        }

        const results: any[] = [];

        // Search projects
        const projectsSnapshot = await db.collection("projects")
            .where("clientId", "==", userId)
            .get();

        projectsSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.name.toLowerCase().includes(query) || data.description.toLowerCase().includes(query)) {
                results.push({ type: 'प्रोजेक्ट', id: doc.id, ...data });
            }
        });
        
        // Note: Searching subcollections (files, messages) is complex and inefficient
        // without a dedicated search index. This is a simplified example.
        // We will just search files from the first project found for this demo.
        if (projectsSnapshot.docs.length > 0) {
            const projectId = projectsSnapshot.docs[0].id;
            
            // Search Files
            const filesSnapshot = await db.collection(`projects/${projectId}/files`).get();
            filesSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.name.toLowerCase().includes(query)) {
                    results.push({ type: 'फ़ाइल', id: doc.id, ...data, fileType: data.type });
                }
            });

            // Search Messages
            const messagesSnapshot = await db.collection(`projects/${projectId}/messages`).get();
            messagesSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.text.toLowerCase().includes(query)) {
                    results.push({ type: 'संदेश', id: doc.id, ...data });
                }
            });
        }


        res.status(200).json({ success: true, data: results });

    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
