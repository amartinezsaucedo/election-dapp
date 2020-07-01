const Election = artifacts.require("./Election.sol");

contract("Election", function (accounts) {
  let electionInstance;
  it("initializes with two candidates", () => {
    return Election.deployed().then(instance =>
      instance.candidatesCount()
    ).then(count => assert.equal(count, 2));
  });
  it("initializes the candidate correctly", () => Election.deployed().then(instance => {
    electionInstance = instance;
    return electionInstance.candidates(1);
  }).then(candidate => {
    assert.equal(candidate[0], 1, "Correct id");
    assert.equal(candidate[1], "Alberto Fernandez", "Correct name");
    assert.equal(candidate[2], 0, "Correct vote count");
    return electionInstance.candidates(2);
  }).then(candidate => {
    assert.equal(candidate[0], 2, "Correct id");
    assert.equal(candidate[1], "Mauricio Macri", "Correct name");
    assert.equal(candidate[2], 0, "Correct vote count");
  }));
  it("allows to cast a vote", () => Election.deployed().then(instance => {
      electionInstance = instance;
      candidateId = 1;
      return electionInstance.vote(candidateId, {from: accounts[0]});
    }).then(receipt => {
      assert.equal(receipt.logs.length, 1, "event triggered");
      assert.equal(receipt.logs[0].event, "votedEvent", "correct event type");
      assert.equal(receipt.logs[0].args.candidateId.toNumber(), candidateId, "correct candidate id");
      return electionInstance.voters(accounts[0]);
    })
      .then(voted => {
        assert(voted, "Vote cast");
        return electionInstance.candidates(candidateId);
      }).then(candidate => {
        let voteCount = candidate[2];
        assert(voteCount, 1, "Candidate has one vote");
      })
  );
  it("does not allow invalid candidates to be voted", () => Election.deployed().then(instance => {
    electionInstance = instance;
    return electionInstance.vote(99, {from: accounts[0]});
  })
    .then(assert.fail).catch(error => {
      assert(error.message.indexOf("revert") >= 0, "error message contains revert");
      return electionInstance.candidates(1);
    }).then(candidate1 => {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "Invalid vote has not incremented vote count");
      return electionInstance.candidates(2);
    }).then(candidate2 => {
      let voteCount = candidate2[2];
      assert.equal(voteCount, 0, "Vote count has not incremented");
    }));
  it("does not allow to double vote", () => Election.deployed().then(instance => {
    electionInstance = instance;
    candidateId = 2;
    electionInstance.vote(candidateId, {from: accounts[1]});
    return electionInstance.candidates(candidateId);
  }).then(candidate => {
    let voteCount = candidate[2];
    assert.equal(voteCount, 1, "Valid vote");
    return electionInstance.vote(candidateId, {from: accounts[1]});
  }).then(assert.fail).catch(error => {
    assert(error.message.indexOf('revert') >= 0, "error message contains revert");
    return electionInstance.candidates(1);
  }).then(candidate1 => {
    let voteCount = candidate1[2];
    assert.equal(voteCount, 1, "Candidate did not receive two votes");
    return electionInstance.candidates(2);
  }).then(candidate2 => {
    let voteCount = candidate2[2];
    assert.equal(voteCount, 1, "Candidate did not receive two votes");
  }));
});
