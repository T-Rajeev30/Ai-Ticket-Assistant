import jwt from "jsonwebtoken";

export const authentication = (req, res, next) => {
  const token = req.headers.authentication?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied No token found." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};
