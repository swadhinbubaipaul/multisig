// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./MultisigWallet.sol";

contract TestContract is MultisigWallet {
    uint public i;

    function initialize(address _multisigAddress) external {
        require(_multisigAddress != address(0), "invalid multisig address");
        multisigAddress = _multisigAddress;
    }

    function callMe(
        uint j
    ) public multisig(0, abi.encodeWithSignature("callMe(uint256)", j)) {
        i += j;
    }

    function getCallMeData(uint num) public pure returns (bytes memory) {
        return abi.encodeWithSignature("callMe(uint256)", num);
    }
}
