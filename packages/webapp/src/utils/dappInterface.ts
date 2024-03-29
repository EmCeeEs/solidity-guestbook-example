import * as R from "ramda";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

import { Guestbook } from "@solidity-guestbook-example/dapp/build/typings/web3/Guestbook";
import guestbookJson from "@solidity-guestbook-example/dapp/build/contracts/Guestbook.json";

import { User } from "../store/reducer";

const getGuestbookAbi = (): AbiItem[] =>
  R.prop("abi")(guestbookJson) as AbiItem[];

const getGuestbookAddress = (network: number): string =>
  R.path(["networks", R.toString(network), "address"])(guestbookJson) as string;

type UserOnBlockchain = [string, string, string, string[]];
const createUser = (user: UserOnBlockchain): User => ({
  nickName: user[0],
  city: user[1],
  country: user[2]
});

export const createDappInterface = (web3: Web3) => {
  const getAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  };

  const getNetworkId = async () => {
    return web3.eth.net.getId();
  };

  const getGuestbook = async (): Promise<Guestbook> => {
    return new web3.eth.Contract(
      getGuestbookAbi(),
      getGuestbookAddress(await getNetworkId())
    );
  };

  const getUsers = async () => {
    const guestbook = await getGuestbook();
    const userAddresses = await guestbook.methods.getUsers().call();
    const users: UserOnBlockchain[] = await Promise.all(
      userAddresses.map((address: string) =>
        guestbook.methods.getUser(address).call()
      )
    );
    return R.map(createUser, users);
  };

  const registerUser = async (user: User) => {
    const guestbook = await getGuestbook();
    const address = await getAccount();

    try {
      await guestbook.methods
        .registerNewUser(user.nickName, user.country, user.city)
        .send({ from: address });
    } catch (error) {
      console.error("error registering user", error);
    }
  };

  return {
    getAccount,
    getNetworkId,
    getGuestbook,
    getUsers,
    registerUser
  };
};

export type DappInterface = ReturnType<typeof createDappInterface>;
