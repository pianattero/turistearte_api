const User = require("../models/User.model");

module.exports.isAuthenticated = (req, res, next) => {
  const authorization = req.header("Authorization");

  if (!authorization) {
    return next(
      createError(
        StatusCodes.UNAUTHORIZED,
        "Authorization header was not provided"
      )
    );
  }

  const [schema, token] = authorization.split(" ");

  if (schema !== "Bearer") {
    return next(
      createError(
        StatusCodes.UNAUTHORIZED,
        "Authorization schema is not supported"
      )
    );
  }

  if (!token) {
    return next(
      createError(StatusCodes.UNAUTHORIZED, "A token must be provided")
    );
  }
};
