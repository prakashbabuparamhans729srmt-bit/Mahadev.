/**
 * A utility function to retry an async operation with exponential backoff.
 * This is particularly useful for network requests that might fail intermittently.
 *
 * @param operation A function that returns a promise to be retried.
 * @param maxRetries The maximum number of times to retry the operation.
 * @returns The result of the successful operation.
 * @throws The error from the last failed attempt.
 */
export async function firebaseWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Attempt the operation
      return await operation();
    } catch (error: any) {
      console.warn(`Attempt ${attempt} failed: ${error.message}`);

      // If it's the last attempt, re-throw the error
      if (attempt === maxRetries) {
        console.error(`Operation failed after ${maxRetries} attempts.`);
        throw error;
      }

      // Implement exponential backoff with jitter
      // Delay = 2^(attempt-1) * 1000ms + random jitter
      const delay =
        Math.min(1000 * Math.pow(2, attempt - 1), 10000) + // Base delay
        Math.random() * 1000;                             // Jitter

      console.log(`Retrying in ${Math.round(delay)}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  // This part should be unreachable, but TypeScript needs a return path.
  throw new Error("Operation failed after all retries.");
}
