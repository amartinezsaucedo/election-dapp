# Election Dapp

## Development dependencies
* [NPM](https://nodejs.org/en/)
* [Truffle](https://www.trufflesuite.com/)
* [Ganache](https://www.trufflesuite.com/ganache)
* Metamask
  - [Chrome](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
  - [Firefox](https://addons.mozilla.org/es/firefox/addon/ether-metamask/)
## Configuration
#### Ganache
After installing, create a new workspace by clicking on "Quickstart Ethereum".
#### Metamask
Once you've added Metamask plugin to your browser: 
1.  Create a new wallet and set a password.
2.  Click on your account picture and select the "Import account" option.
3.  To import an account choose one from Ganache and click on "Show keys". Copy the private key to use it on Metamask.
4.  Under "Main Ethereum Network" click on "Custom RCP" to add our local RCP server.
5.  Go to Ganache, copy the RCP server address and paste it on "New RCP URL". Set a network name and save. 
## Run locally
### Install
`$ npm install`
## Migrate contracts
`$ truffle migrate --reset`
### Run
`$ npm run dev`
## Run tests
`$ truffle test` 
