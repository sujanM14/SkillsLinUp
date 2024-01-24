import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      const token = authorizationHeader.split(" ")[1];

      if (token) {
        const decodedData = jwt.verify(token, "sEcReT");

        // Check token expiration
        if (decodedData.exp && decodedData.exp * 1000 < Date.now()) {
          return res.status(401).json({ message: "Token has expired" });
        }

        req.userId = decodedData?.id;
      }
    }

    next();
  } catch (error) {
    console.error(error);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Handle other errors
    res.status(500).json({ message: "Internal server error" });
  }
};

export default auth;
