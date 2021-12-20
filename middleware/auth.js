import jwt from 'jsonwebtoken'

function auth(req, res, next) {
  //Accessing token by using x-auth-token header key 
  const token = req.header("x-auth-token");

  //check for token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token in invalid " });
  }
}

export default auth;
