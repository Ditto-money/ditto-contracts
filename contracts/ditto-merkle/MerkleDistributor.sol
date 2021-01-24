// SPDX-License-Identifier: MIT
pragma solidity >=0.7.3;


import "@pancakeswap/pancake-swap-lib/contracts/token/BEP20/BEP20.sol"; 
import "@pancakeswap/pancake-swap-lib/contracts/token/BEP20/IBEP20.sol"; 
import "@pancakeswap/pancake-swap-lib/contracts/token/BEP20/SafeBEP20.sol"; 
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/cryptography/MerkleProofUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "../interfaces/IMerkleDistributor.sol";

contract MerkleDistributor is Initializable, IMerkleDistributor {
    address public token;
    bytes32 public merkleRoot;
    uint256 public withdrawBlock;
    address public withdrawAddress;

    // This is a packed array of booleans.
    mapping(uint256 => uint256) internal claimedBitMap;

    function __MerkleDistributor_init(address token_, bytes32 merkleRoot_,uint256 _withdrawBlock, address _withdrawAddress) public initializer {
        token = token_;
        merkleRoot = merkleRoot_;
        withdrawBlock = _withdrawBlock;
        withdrawAddress = _withdrawAddress;
    }

    function isClaimed(uint256 index) public override view returns (bool) {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        uint256 claimedWord = claimedBitMap[claimedWordIndex];
        uint256 mask = (1 << claimedBitIndex);
        return claimedWord & mask == mask;
    }

    function _setClaimed(uint256 index) internal {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        claimedBitMap[claimedWordIndex] = claimedBitMap[claimedWordIndex] | (1 << claimedBitIndex);
    }

    function claim(
        uint256 index,
        address account,    
        uint256 amount,
        bytes32[] calldata merkleProof
    ) external virtual override {
        require(!isClaimed(index), "MerkleDistributor: Drop already claimed.");

        // Verify the merkle proof.
        bytes32 node = keccak256(abi.encodePacked(index, account, amount));
        require(MerkleProofUpgradeable.verify(merkleProof, merkleRoot, node), "MerkleDistributor: Invalid proof.");

        // Mark it claimed and send the token.
        _setClaimed(index);
        require(IERC20Upgradeable(token).transfer(account, amount), "MerkleDistributor: Transfer failed.");

        emit Claimed(index, account, amount);
    }

    function withdraw() external {
        require(
            block.number >= withdrawBlock,
            'DittoClaimDistributor: Withdraw failed, cannot claim until after validBlocks diff'
        );
        require(
            IBEP20(token).transfer(withdrawAddress, IBEP20(token).balanceOf(address(this))),
            'DittoClaimDistributor: Withdraw transfer failed.'
        );
    }
}