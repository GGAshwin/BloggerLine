const jwt = require("jsonwebtoken");
const jwtSecret = "very_secret_token";

function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Verify the JWT token using your secret key
    const decoded = jwt.verify(token, jwtSecret);
    // Check if the decoded payload contains 'role' with value "admin"
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden (Not Admin)" });
    }

    // If valid admin token, attach decoded user data to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // Handle JWT verification errors
    console.error(err);
    return res.status(401).json({ message: "Unauthorized (Invalid token)" });
  }
}

module.exports = verifyAdmin;
