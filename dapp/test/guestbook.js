const Guestbook = artifacts.require("Guestbook")
const { assert }  = require("./setup")

const USER_1 = ['Nicname23', 'Berlin', 'Berlin', 'Germany']
const USER_2 = ['Bobby', 'Colonge', 'NRW', 'Germany']

const IMAGE_1 = ['http://images.com/1', '0x6c3e007e281f6948b37c511a11e43c8026d2a16a8a45fed4e83379b66b0ab927']
const IMAGE_2 = ['http://images.com/2', '0x6c3e007e281f6948b37c511a11e43c8026d2a16a8a45fed4e83379b66b0ab928']

contract('Guestbook', ([admin, user1, user2]) => {
  it('Initial state is empty (no users, no images)', async () => {
    const guestbook = await Guestbook.new({ from: admin })

    const users = await guestbook.getUsers()
    const images = await guestbook.getAllImages()

    assert.equal(users.length, 0)
    assert.equal(images.length, 0)
  })

  it('Users can create accounts.', async () => {
    const guestbook = await Guestbook.new({ from: admin })

    await guestbook.registerNewUser(...USER_1, { from: user1 })
    await guestbook.registerNewUser(...USER_2, { from: user2 })

    const users = await guestbook.getUsers()

    assert.equal(users.length, 2)
    assert.deepEqual(users, [user1, user2])
  })

  it('Users cannot delete accounts.', async () => {
    const guestbook = await Guestbook.new({ from: admin })

    await guestbook.registerNewUser(...USER_1, { from: user1 })
    await guestbook.registerNewUser(...USER_2, { from: user2 })

    await assert.isRejected(guestbook.removeUser(user1, { from: user1 }))
    await assert.isRejected(guestbook.removeUser(user2, { from: user1 }))
  })

  it('Admin (owner) can delete users', async () => {
    const guestbook = await Guestbook.new({ from: admin })

    await guestbook.registerNewUser(...USER_1, { from: user1 })
    await guestbook.registerNewUser(...USER_2, { from: user2 })

    await guestbook.removeUser(user1, { from: admin })

    const users = await guestbook.getUsers()

    assert.equal(users.length, 1)
    assert.deepEqual(users, [user2])
  })

  it('User can upload images', async () => {
    const guestbook = await Guestbook.new()

    await guestbook.registerNewUser(...USER_1, { from: user1 })
    await guestbook.addImageToUser(...IMAGE_1, { from: user1 })
    await guestbook.addImageToUser(...IMAGE_2, { from: user1 })

    const images = await guestbook.getUserImages(user1)

    assert.equal(images.length, 2)
    assert.deepEqual(images, [IMAGE_1[1], IMAGE_2[1]])
  })

  it('User cannot delete images', async () => {
    const guestbook = await Guestbook.new()

    await guestbook.registerNewUser(...USER_1, { from: user1 })
    await guestbook.addImageToUser(...IMAGE_1, { from: user1 })
    await guestbook.addImageToUser(...IMAGE_2, { from: user1 })

    await assert.isRejected(guestbook.removeImage(IMAGE_1[1], { from: user1 }))
    await assert.isRejected(guestbook.removeImage(IMAGE_2[1], { from: user1 }))
  })

  it('Admin (owner) can delete images', async () => {
    const guestbook = await Guestbook.new()

    await guestbook.registerNewUser(...USER_1, { from: user1 })
    await guestbook.addImageToUser(...IMAGE_1, { from: user1 })
    await guestbook.addImageToUser(...IMAGE_2, { from: user1 })

    await guestbook.removeImage(IMAGE_1[1], { from: admin })

    const images = await guestbook.getAllImages()

    assert.equal(images.length, 1)
    assert.deepEqual(images, [IMAGE_2[1]])
  })
})
