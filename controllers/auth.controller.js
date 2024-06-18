const User = require("../models/User.model");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

module.exports.signup = async (req, res, next) => {
  const { email, password, repeatPassword } = req.body;

  if ((email, password && repeatPassword && password === repeatPassword)) {
    const userBody = {
      ...req.body,
    };

    return User.create(userBody)
      .then((userCreated) => {
        res.status(StatusCodes.CREATED).json(userCreated);
      })
      .catch(next);
  } else {
    next(
      createError(StatusCodes.BAD_REQUEST, {
        errors: { password: "Las contraseñas no coinciden" },
      })
    );
  }
};

module.exports.login = (req, res, next) => {
  const loginError = createError(
    StatusCodes.UNAUTHORIZED,
    "El email o la contraseña son incorrectos"
  );
  const { email, password } = req.body;

  if (!email || !password) {
    return next(loginError);
  }

  // Check email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return next(loginError);
      }

      // Check password
      return user.checkPassword(password).then((match) => {
        if (!match) {
          return next(loginError);
        }
        // Emitir y firmar un token jwt con la info del usuario
        const token = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET || "secret",
          {
            expiresIn: "1h",
          }
        );

        res.json({ accessToken: token, user: user });
      });
    })
    .catch(next);
};
