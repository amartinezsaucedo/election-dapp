App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: () => App.initWeb3(),

  initWeb3: () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: () => {
    $.getJSON("Election.json", election => {
      App.contracts.Election = TruffleContract(election);
      App.contracts.Election.setProvider(App.web3Provider);
      App.listenForEvents();
      return App.render();
    });
  },

  castVote: () => {
    let candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(instance => instance.vote(candidateId, {from: App.account}))
      .then(() => {
        $("#content").hide();
        $("#loader").show();
      }).catch(error => console.error(error));
  },

  listenForEvents: () => {
    App.contracts.Election.deployed().then(instance => {
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(() => App.render());
    });
  },

  render: () => {
    let electionInstance;
    let loader = $("#loader");
    let content = $("#content");
    loader.show();
    content.hide();
    web3.eth.getCoinbase((err, account) => {
      if (!err) {
        App.account = account;
        $("#accountAddress").html("Tu Cuenta: " + account);
      }
    });
    App.contracts.Election.deployed().then(instance => {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(candidatesCount => {
      const promises = [];
      for (let i = 1; i <= candidatesCount; i++) {
        promises.push(electionInstance.candidates(i));
      }
      Promise.all(promises).then(candidates => {
        let candidatesResults = $("#candidatesResults");
        candidatesResults.empty();
        let candidatesSelect = $('#candidatesSelect');
        candidatesSelect.empty();
        candidates.forEach(candidate => {
          let id = candidate[0];
          let name = candidate[1];
          let voteCount = candidate[2];
          let candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>";
          candidatesResults.append(candidateTemplate);
          let candidateOption = "<option value='" + id + "' >" + name + "</ option>";
          candidatesSelect.append(candidateOption);
        });
      });
      return electionInstance.voters(App.account);
    }).then(voted => {
      if (voted) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(error => {
      console.warn(error);
    });
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
