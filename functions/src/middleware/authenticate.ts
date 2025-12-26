import * as admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

// Extend the Express Request type to include the user object
interface AuthenticatedRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

/**
 * Middleware to verify Firebase ID token.
 * If the token is valid, it attaches the decoded token to the request object.
 * If not, it sends a 401 Unauthorized response.
 */
export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token." });
  }
};
