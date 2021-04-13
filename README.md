# solidity-guestbook-example

A simple decentralized guestbook in solidity.

This repo contains two packages:
* dapp (the guestbook contract)
  * uses truffle, typechain, docker-compose
* webapp (a frontend for the guestbook)
  * uses create-react-app, web3, metamask, redux-saga

### Installation

* Install dependencies: `yarn`
* Build artifacts: `yarn build`

### Development

In one terminal start dev blockchain:
* `cd packages/dapp`
* `truffle develop --log`

In another terminal deploy guestbook to dev blockchain:
* `cd packages/dapp`
* `truffle migrate --network develop`

Connect metamask to the development blockchain:
* `http://localhost:9545` (network_id: 1111)

Start webapp:
* `cd packages/webapp`
* `yarn start`