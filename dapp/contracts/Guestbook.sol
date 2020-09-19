// SPDX-License-Identifier: MIT
pragma solidity ^0.5;
pragma experimental ABIEncoderV2;

contract Guestbook {
    address admin = msg.sender;

    mapping(bytes32 => notarizedImage) notarizedImages;
    bytes32[] imagesByNotaryHash;

    mapping(address => User) Users;
    address[] usersByAddress;

    struct notarizedImage {
        string imageUrl;
        uint256 timeStamp;
    }

    struct User {
        string handle;
        string city;
        string state;
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
        delete Users[badUser];

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

    function _isUser(address user) internal view returns (bool) {
        return bytes(Users[user].handle).length != 0;
    }

    function registerNewUser(
        string memory handle,
        string memory city,
        string memory state,
        string memory country
    ) public {
        require(!_isEmpty(handle));
        require(!_isUser(msg.sender));

        Users[msg.sender].handle = handle;
        Users[msg.sender].city = city;
        Users[msg.sender].state = state;
        Users[msg.sender].country = country;

        usersByAddress.push(msg.sender);
    }

    function addImageToUser(string memory imageUrl, bytes32 SHA256notaryHash)
        public
    {
        require(!_isEmpty(imageUrl));
        require(_isUser(msg.sender));

        notarizedImages[SHA256notaryHash].imageUrl = imageUrl;
        notarizedImages[SHA256notaryHash].timeStamp = block.timestamp;

        imagesByNotaryHash.push(SHA256notaryHash);
        Users[msg.sender].myImages.push(SHA256notaryHash);
    }

    function getUsers() public view returns (address[] memory) {
        return usersByAddress;
    }

    function getUser(address userAddress) public view returns (User memory) {
        return Users[userAddress];
    }

    function getAllImages() public view returns (bytes32[] memory) {
        return imagesByNotaryHash;
    }

    function getUserImages(address userAddress)
        public
        view
        returns (bytes32[] memory)
    {
        return Users[userAddress].myImages;
    }

    function getImage(bytes32 SHA256notaryHash)
        public
        view
        returns (notarizedImage memory)
    {
        return notarizedImages[SHA256notaryHash];
    }
}
