import React, { FC, useEffect } from 'react'

import { createWeb3 } from '../utils/web3'
import { createDappInterface } from '../utils/dapp'

const me = '0xa745b8822FE49EE35344c52f7751dcA72F7fca52'

export const ConnectionStatus: FC = () => {
  const web3 = createWeb3()
  const dappInterface = createDappInterface(web3)

  useEffect(() => {
    const callMe = async () => {
      const guestbook = await dappInterface.getGuestbook()

      await guestbook.methods.registerNewUser('hi', 'du', 'bist', 'cool').send()
      console.log('users:', await guestbook.methods.getUsers().call())
      await guestbook.methods.removeUser(me).send()
    }
    callMe()
  })

  return <></>
}
