const LegacyFactory = artifacts.require("LegacyFactory");

module.exports = function (deployer) {
    deployer.deploy(LegacyFactory);
};
