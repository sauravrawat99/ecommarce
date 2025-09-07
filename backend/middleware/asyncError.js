const asyncError = (theFunc) => {
  return (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch((err) => {
      console.error("Caught in asyncError:", err);
      next(err);
    });
  };
};

module.exports = asyncError;
