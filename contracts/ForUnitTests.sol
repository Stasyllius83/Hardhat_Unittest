// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Payments {
    address public owner;

    struct Payment {
        uint256 amount;
        address from;
        uint timestamp;
        string message;
    }

    mapping(uint8 => Payment) payments;

    constructor() {
        owner = msg.sender;
    }

    function getPayments(uint8 _index) public view returns(Payment memory) {
        return payments[_index];
    }

    //memory vs calldata
    //set message for payment
    function setMessageMemo(uint8 _index, string memory _message) public {
        Payment memory newPayment = Payment(
            10,
            owner,
            block.timestamp,
            _message
        );

        payments[_index] = newPayment;
    }

    function setMessageCall(uint8 _index, string calldata _message) public {
        Payment memory newPayment = Payment(
            10,
            owner,
            block.timestamp,
            _message
        );

        payments[_index] = newPayment;
    }

    //square the elements of the array
    function squareArrayMemo(uint256[] memory _array) public pure returns(uint256[3] memory) {
        uint256[3] memory changeArr;

        for (uint8 i=0; i < _array.length; i++) {
            changeArr[i] = _array[i]**2;
        }
        return changeArr;
    }

    function squareArrayCall(uint256[] calldata _array) public pure returns(uint256[3] memory) {
        uint256[3] memory changeArr;

        for (uint8 i=0; i < _array.length; i++) {
            changeArr[i] = _array[i]**2;
        }
        return changeArr;
    }

    //storage
    function setAmountStor(uint8 _index, uint256 _amount) public {
        Payment storage localPayment = payments[_index];
        localPayment.amount = _amount;
    }

}
