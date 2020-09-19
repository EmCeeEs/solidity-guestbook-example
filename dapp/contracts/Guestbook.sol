// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Guestbook {
    address admin = msg.sender;

    mapping(bytes32 => notarizedImage) notarizedImages;
    bytes32[] imagesByNotaryHash;

    mapping(address => User) Users;
    address[] usersByAddress;

    struct notarizedImage {
        string imageURL;
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
        private
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
        private
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
        usersByAddress[badUserIndex] = usersByAddress[usersByAddress.length-1];
        usersByAddress.length--;
    }

    function removeImage(bytes32 badImage) public onlyAdmin {
        delete notarizedImages[badImage];

        // swap and delete last
        uint256 badImageIndex = _indexOf(badImage, imagesByNotaryHash);
        imagesByNotaryHash[badImageIndex] = imagesByNotaryHash[imagesByNotaryHash.length-1];
        imagesByNotaryHash.length--;
    }

    function registerNewUser(
        string memory handle,
        string memory city,
        string memory state,
        string memory country
    ) public returns (bool success) {
        address thisNewAddress = msg.sender;

        if (
            bytes(Users[msg.sender].handle).length == 0 &&
            bytes(handle).length != 0
        ) {
            Users[thisNewAddress].handle = handle;
            Users[thisNewAddress].city = city;
            Users[thisNewAddress].state = state;
            Users[thisNewAddress].country = country;

            usersByAddress.push(thisNewAddress);
            return true;
        } else {
            return false;
        }
    }

    function addImageToUser(string memory imageURL, bytes32 SHA256notaryHash)
        public
        returns (bool success)
    {
        address thisNewAddress = msg.sender;
        if (bytes(Users[thisNewAddress].handle).length != 0) {
            // make sure this user has created an account first
            if (bytes(imageURL).length != 0) {
                // ) {  // couldn't get bytes32 null check to work, oh well!
                // prevent users from fighting over sha->image listings in the whitepages, but still allow them to add a personal ref to any sha
                if (
                    bytes(notarizedImages[SHA256notaryHash].imageURL).length ==
                    0
                ) {
                    imagesByNotaryHash.push(SHA256notaryHash); // adds entry for this image to our image whitepages
                }
                notarizedImages[SHA256notaryHash].imageURL = imageURL;
                notarizedImages[SHA256notaryHash].timeStamp = block.timestamp; // note that updating an image also updates the timestamp
                Users[thisNewAddress].myImages.push(SHA256notaryHash); // add the image hash to this users .myImages array
                return true;
            } else {
                return false; // either imageURL or SHA256notaryHash was null, couldn't store image
            }
        } else {
            return false; // user didn't have an account yet, couldn't store image
        }
    }

    function getUsers() public view returns (address[] memory) {
        return usersByAddress;
    }

    function getUser(address userAddress)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            bytes32[] memory
        )
    {
        return (
            Users[userAddress].handle,
            Users[userAddress].city,
            Users[userAddress].state,
            Users[userAddress].country,
            Users[userAddress].myImages
        );
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
        returns (string memory, uint256)
    {
        return (
            notarizedImages[SHA256notaryHash].imageURL,
            notarizedImages[SHA256notaryHash].timeStamp
        );
    }
}
