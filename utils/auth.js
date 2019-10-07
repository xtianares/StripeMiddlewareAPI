const jwt = require('jsonwebtoken');

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    // const token = req.header('x-auth-header');
    // console.log(authorizationHeaader);
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      // console.log(token);
      const options = {
        expiresIn: '12h',
        issuer: 'AssuredApp',
        // audience: "5d96c3915b2e0730ed1fbd20" // needs to be the id of the logged in user
      };
      try {
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        req.decoded = result;
        console.log("Authentication Success...");
        next();
      } catch (err) {
        throw new Error(err);
      }
    } else {
      result = {
        error: "Authentication error. Token required.",
        status: 401
      };
      res.status(401).send(result);
    }
  }
};