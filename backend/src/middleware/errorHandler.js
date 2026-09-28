/**
 * Centralized error handler middleware
 * Returns user-friendly JSON responses and hides sensitive internal stack traces in production.
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode !== 200 ? res.statusCode : 500;
  
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message);

  return res.status(statusCode >= 400 ? statusCode : 500).json({
    error: err.name || "Error",
    message: err.message || "An unexpected system error occurred",
    ...(process.env.NODE_ENV === "development" && { details: err.stack })
  });
};

export const notFoundHandler = (req, res) => {
  return res.status(404).json({
    error: "Not Found",
    message: `API route ${req.method} ${req.originalUrl} not found`
  });
};
