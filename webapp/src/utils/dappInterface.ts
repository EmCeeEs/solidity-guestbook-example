import * as R from 'ramda';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils'

import { Guestbook } from './../dapp/dist/Guestbook'
import guestbookJson from './../dapp/build/contracts/Guestbook.json'

const getGuestbookAbi = (): AbiItem[] => R.prop('abi')(guestbookJson) as AbiItem[]

const getGuestbookAddress = (network: number): string =>
  R.path(['networks', R.toString(network), 'address'])(guestbookJson) as string

export const createDappInterface = (web3: Web3) => {

  const getAccount = async () => {
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
  }

  const getNetworkId = async () => {
    return web3.eth.net.getId()
  }

  const getGuestbook = async () => {
    return (new web3.eth.Contract(
      getGuestbookAbi(),
      getGuestbookAddress(await getNetworkId()),
      // { from: await getAccount() },
    ) as unknown) as Promise<Guestbook>
  }

  const getUsers = async () => {
    const guestbook = await getGuestbook()
    return guestbook.methods.getUsers().call()
  }

  return {
    getAccount,
    getNetworkId,
    getGuestbook,
    getUsers,
  }
}
