// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract Legacy {
    // Name assigned to heir contract
    string public name;

    // address of the owner
    address public owner;

    // time at which owner was last active
    uint256 public lastOwnerActive;

    // amount of time after inactivity of owner which heir can claim the assets
    uint256 public lockingTime;

    // address of the heir
    address public heir;

    constructor(
        string memory _name,
        address _owner,
        uint256 _lockingTime,
        address _heir
    ) {
        name = _name;
        owner = _owner;
        lockingTime = _lockingTime;
        heir = _heir;

        // set last owner active time to current time
        lastOwnerActive = block.timestamp;
    }

    modifier isOwner() {
        require(msg.sender == owner, "User should be owner.");
        _;
    }

    modifier isheir() {
        require(msg.sender == heir, "User should be heir.");
        _;
    }

    event WithdrewERC20(address token, address by, address to, uint256 amount);
    event Withdrew(address by, address to, uint256 amount);
    event Received(uint256 amount);

    modifier isAllowed() {
        require(
            msg.sender == owner ||
                (msg.sender == heir &&
                    block.timestamp >= (lastOwnerActive + lockingTime)),
            "Not Allowed!"
        );
        _;
    }

    function withdrawERC20(
        address _tokenAddress,
        address _to,
        uint256 _amount
    ) external isAllowed {
        IERC20Metadata token = IERC20Metadata(_tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance >= _amount, "Insufficient Balance!");
        token.transfer(_to, _amount);
        emit WithdrewERC20(_tokenAddress, msg.sender, _to, _amount);
    }

    function withdraw(address payable _to, uint256 _amount) external isAllowed {
        // check of balance is less than required amount
        require(address(this).balance >= _amount, "Insufficient Balance!");
        _to.transfer(_amount);

        // emit event
        emit Withdrew(msg.sender, _to, _amount);
    }

    function heartbeat() external isOwner {
        // update last owner active timestamp
        lastOwnerActive = block.timestamp;
    }
    //Circumstances may change, and the owner might want to assign a new heir.
    function changeHeir(address _newHeir) external isOwner {
        heir = _newHeir;
    }

    receive() external payable {
        // check if sender is owner of the contract
        require(msg.sender == owner, "User should be owner.");

        emit Received(msg.value);
    }
}