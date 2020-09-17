module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*" // set to low number so deployment works?
    }
  },
  compilers: {
    solc: {
      version: "0.4.9",
    }
  }
};
