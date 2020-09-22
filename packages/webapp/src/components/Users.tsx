import React, { FC, useEffect } from 'react';
import { createDappInterface } from '../utils/dappInterface';
import { createWeb3 } from '../utils/web3';

export const Users: FC = () => {
  const web3 = createWeb3()
  const dappInterface = createDappInterface(web3)

  useEffect(() => {

    const callme = async () => {
      const users = await dappInterface.getUsers()

      console.log('users', users)
    }

    callme()
  })

  return (<></>)
}
