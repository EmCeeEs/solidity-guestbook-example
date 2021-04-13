module.exports = {
  networks: {
    develop: {
      host: 'localhost',
      port: 9545,
      network_id: "1111",
      accounts: 10,
      defaultEtherBalance: 500,
    },
    test: {
      host: 'ganache-docker',
      port: 8545,
      network_id: '*',
    },
  }
};
