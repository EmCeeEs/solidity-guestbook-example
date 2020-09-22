module.exports = {
  networks: {
    develop: {
      host: 'localhost',
      port: 9545,
      network_id: '*',
      accounts: 5,
      defaultEtherBalance: 500,
    },
    test: {
      host: 'ganache-docker',
      port: 8545,
      network_id: '*',
    },
  }
};
