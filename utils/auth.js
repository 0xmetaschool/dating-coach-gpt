import jwt from 'jsonwebtoken';

// @dev Middleware to authenticate requests using a JWT token from the Authorization header.
export const authenticate = (handler) => async (req, res) => {
  // @dev Extract the token from the Authorization header and remove the 'Bearer ' prefix.
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  // @dev If no token is provided, return a 401 Unauthorized response.
  if (!token) return res.status(401).json({ message: "Authentication required" });
  
  try {
    // @dev Verify the token using the JWT secret from environment variables.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // @dev Attach the decoded user ID to the request object for use in the handler.
    req.userId = decoded.userId;
    
    // @dev Call the next handler in the chain.
    return handler(req, res);
  } catch (error) {
    // @dev If the token is invalid, return a 401 Unauthorized response.
    return res.status(401).json({ message: "Invalid token" });
  }
};

// @dev Middleware to authenticate Server-Sent Events (SSE) requests using a JWT token from the query parameters.
export const authenticateSSE = (handler) => async (req, res) => {
  // @dev Extract the token from the query parameters.
  const token = req.query.token;
  
  // @dev If no token is provided, return a 401 Unauthorized response.
  if (!token) return res.status(401).json({ message: "Authentication required" });
  
  try {
    // @dev Verify the token using the JWT secret from environment variables.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // @dev Attach the decoded user ID to the request object for use in the handler.
    req.userId = decoded.userId;
    
    // @dev Call the next handler in the chain.
    return handler(req, res);
  } catch (error) {
    // @dev If the token is invalid, return a 401 Unauthorized response.
    return res.status(401).json({ message: "Invalid token" });
  }
};