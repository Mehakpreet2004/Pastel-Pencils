// const jwt = require("jsonwebtoken");

// const authMiddleware = async (req, res, next) => {
//   const { token } = req.headers;
//   if (!token) {
//     return res.json({ success: false, message: "Not Authorized Login Again" });
//   }
//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = token_decode.id;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: token_decode.id }; // ✅ FIX HERE
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;
