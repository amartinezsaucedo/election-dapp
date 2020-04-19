pragma solidity 0.5.16;

contract Election {
    string public candidate;

    struct Candidate {
        uint id;
        string name;
        uint votes;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool)public voters;

    uint public candidatesCount;

    constructor()public{
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string memory name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    }

    function vote(uint candidateId) public {
        require(!voters[msg.sender]);
        require(candidateId > 0 && candidateId <= candidatesCount);
        voters[msg.sender] = true;
        candidates[candidateId].votes++;
        emit votedEvent(candidateId);
    }

    event votedEvent (
        uint indexed candidateId
    );
}