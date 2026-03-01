const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    // Get token from request header
    // Frontend sends: Authorization: Bearer eyJhbGc...
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized. No token.' });
    }

    // Extract just the token part (remove "Bearer ")
    const token = authHeader.split(' ')[1];

    // Verify token using our secret key
    // If token is fake or expired this throws an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request so controllers can use it
    // Now any controller can access req.user.id
    req.user = decoded;

    next(); // Move to the next middleware or controller

  } catch (error) {
    res.status(401).json({ message: 'Not authorized. Invalid token.' });
  }
};

module.exports = protect;