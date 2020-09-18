module.exports = {
  networks: {
    develop: {
      host: "localhost",
      port: 9545,
      network_id: "*"
    },
    test: {
      host: 'ganache',
      port: 8545,
      network_id: '*',
    },
  }
};
