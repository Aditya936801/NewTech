import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token) {
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        next()
      } else {
        res.status(400).json({ message: "Access Denied" });
      }
    } else {
      res.status(400).json({ message: "Login Required" });
    }

    next();
  } catch (err) {
    res.status(400).json({ message: "Access Denied" });
  }
};


export const verifyMasterToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token) {
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
        const verified = jwt.verify(token, process.env.MASTER_JWT_SECRET);
        next()
      } else {
        res.status(400).json({ message: "Access Denied" });
      }
    } else {
      res.status(400).json({ message: "Login Required" });
    }

    next();
  } catch (err) {
    res.status(400).json({ message: "Access Denied" });
  }
};
