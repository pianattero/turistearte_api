const optionsData = require("../options.json");
const proposalsData = require("../proposalsList.json");

module.exports.getOptions = (req, res, next) => {
  try {
    res.json(optionsData);
  } catch (error) {
    next(error);
  }
};

module.exports.getProposals = (req, res, next) => {
  try {
    res.json(proposalsData);
  } catch (error) {
    next(error);
  }
};
