// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Voting {
    string[] public candidates;
    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public votes;

    event Voted(address indexed voter, uint256 option);

    constructor(string[] memory _candidates){
        
        candidates = _candidates;
    }

    function getCandidates() public view returns (string[] memory) {
    return candidates;
    }


    function vote(uint256 _candidate) external {
        require(!hasVoted[msg.sender], "you have already voted");
        require(_candidate < candidates.length, "invalid candidate");

        hasVoted[msg.sender] = true;
        votes[_candidate] += 1;
        emit Voted(msg.sender, _candidate);
    }

    function getVotes() external view returns (uint256[] memory){
        uint256[] memory results=new uint256[](candidates.length);
        for(uint256 i = 0; i < candidates.length; i++) {
            results[i] = votes[i];
        }
        return results;
    }
}