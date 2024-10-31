import jwt from 'jsonwebtoken';

export const authenticate = (handler) => async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: "Authentication required" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authenticateSSE = (handler) => async (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(401).json({ message: "Authentication required" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};