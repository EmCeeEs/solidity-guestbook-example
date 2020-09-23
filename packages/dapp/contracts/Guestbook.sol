// SPDX-License-Identifier: MPL-2.0
pragma solidity ^0.5;
pragma experimental ABIEncoderV2;

contract Guestbook {
    address admin = msg.sender;

    mapping(bytes32 => NotarizedImage) notarizedImages;
    bytes32[] imagesByNotaryHash;

    mapping(address => User) users;
    address[] usersByAddress;

    struct NotarizedImage {
        string imageUrl;
        uint256 timeStamp;
    }

    struct User {
        string nickName;
        string city;
        string country;
        bytes32[] myImages;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    function _indexOf(address badUser, address[] storage accounts)
        internal
        view
        returns (uint256 badUserIndex)
    {
        for (uint256 i = 0; i < accounts.length; i += 1) {
            if (accounts[i] == badUser) {
                return i;
            }
        }
    }

    function _indexOf(bytes32 badImage, bytes32[] storage images)
        internal
        view
        returns (uint256 badUserIndex)
    {
        for (uint256 i = 0; i < images.length; i += 1) {
            if (images[i] == badImage) {
                return i;
            }
        }
    }

    function removeUser(address badUser) public onlyAdmin {
        delete users[badUser];

        // swap and delete last
        uint256 badUserIndex = _indexOf(badUser, usersByAddress);
        uint256 lastIndex = usersByAddress.length - 1;
        usersByAddress[badUserIndex] = usersByAddress[lastIndex];
        usersByAddress.length--;
    }

    function removeImage(bytes32 badImage) public onlyAdmin {
        delete notarizedImages[badImage];

        // swap and delete last
        uint256 badImageIndex = _indexOf(badImage, imagesByNotaryHash);
        uint256 lastIndex = imagesByNotaryHash.length - 1;
        imagesByNotaryHash[badImageIndex] = imagesByNotaryHash[lastIndex];
        imagesByNotaryHash.length--;
    }

    function _isEmpty(string memory s) internal pure returns (bool) {
        return bytes(s).length == 0;
    }

    function _isEmpty(bytes32 b) internal pure returns (bool) {
        return b.length == 0;
    }

    function _isRegisteredUser(address user) internal view returns (bool) {
        return bytes(users[user].nickName).length != 0;
    }

    function registerNewUser(
        string memory nickName,
        string memory city,
        string memory country
    ) public {
        require(!_isEmpty(nickName));
        require(!_isRegisteredUser(msg.sender));

        users[msg.sender].nickName = nickName;
        users[msg.sender].city = city;
        users[msg.sender].country = country;

        usersByAddress.push(msg.sender);
    }

    function addImageToUser(string memory imageUrl, bytes32 SHA256notaryHash)
        public
    {
        require(!_isEmpty(imageUrl));
        require(!_isEmpty(SHA256notaryHash));
        require(_isRegisteredUser(msg.sender));

        notarizedImages[SHA256notaryHash] = NotarizedImage(imageUrl, block.timestamp);

        imagesByNotaryHash.push(SHA256notaryHash);
        users[msg.sender].myImages.push(SHA256notaryHash);
    }

    function getUsers() public view returns (address[] memory) {
        return usersByAddress;
    }

    function getUser(address userAddress) public view returns (User memory) {
        return users[userAddress];
    }

    function getAllImages() public view returns (bytes32[] memory) {
        return imagesByNotaryHash;
    }

    function getUserImages(address userAddress)
        public
        view
        returns (bytes32[] memory)
    {
        return users[userAddress].myImages;
    }

    function getImage(bytes32 SHA256notaryHash)
        public
        view
        returns (NotarizedImage memory)
    {
        return notarizedImages[SHA256notaryHash];
    }
}
