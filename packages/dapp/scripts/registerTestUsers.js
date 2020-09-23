
const Guestbook = artifacts.require("Guestbook")

const USER_1 = ['Alice', 'Berlin', 'Germany']
const USER_2 = ['Bob', 'NYC', 'USA']
const USER_3 = ['Troll', '_-?!></|\\', 'DROP COLUMNS']
const USER_4 = ['Anonymous', '', '']
const USER_5 = ['愛', '東京', '日本']

const USERS = [USER_1, USER_2, USER_3, USER_4, USER_5]

module.exports = async (callback) => {
  const guestbook = await Guestbook.deployed()
  const accounts = await web3.eth.getAccounts()

  await Promise.all(accounts.map(async (account, index) => {
    console.log('hi', USERS[index])

    return guestbook.registerNewUser(...USERS[index], { from: account })
  }
  ))

  callback()
}

