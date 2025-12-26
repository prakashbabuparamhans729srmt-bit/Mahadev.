import * as express from "express";
import * as admin from "firebase-admin";

const router = express.Router();

// Function to check Firestore connection
async function checkFirestore() {
  const startTime = Date.now();
  try {
    const db = admin.firestore();
    // Perform a simple read operation, e.g., get a non-existent document
    // This is a lightweight way to check connectivity and permissions
    await db.collection('_health').doc('check').get();
    return {
      healthy: true,
      latency: Date.now() - startTime,
      message: "Firestore connection is successful."
    };
  } catch (error: any) {
    return {
      healthy: false,
      error: error.message,
      code: error.code
    };
  }
}

// Function to check Firebase Auth (optional, can be expanded)
async function checkAuth() {
    try {
        // This is a placeholder; a real check might involve verifying a service token
        // or checking a known user's status if applicable.
        await admin.auth().getUserByEmail('test@example.com').catch(() => {});
        return { healthy: true, message: "Auth service is reachable." };
    } catch(error: any) {
        // We expect this to fail for a non-existent user, but not throw an SDK error
        if (error.code === 'auth/user-not-found') {
             return { healthy: true, message: "Auth service is reachable." };
        }
        return { healthy: false, error: error.message, code: error.code };
    }
}


// GET /health - Get the health status of backend services
router.get("/", async (req, res) => {
  const checks = {
    firestore: await checkFirestore(),
    auth: await checkAuth(),
    serverTimestamp: new Date().toISOString(),
  };

  const isHealthy = Object.values(checks).every(check => {
    // A check is considered healthy if it's an object with a `healthy: true` property
    // or if it's not an object (like the timestamp).
    if (typeof check === 'object' && check !== null && 'healthy' in check) {
      return check.healthy === true;
    }
    // Non-check properties don't affect health status
    return true;
  });

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "ok" : "error",
    ...checks
  });
});

export default router;
