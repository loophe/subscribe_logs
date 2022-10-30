const Web3 = require( 'web3' )
require('dotenv').config()
const WS_PROVIDER_LINK = process.env.ETHERUM_MAIN_LINK
// const WS_PROVIDER_LINK = process.env.ARBITRUM_MAIN_LINK//arbitrum-one node end-point

const optionsWs = {
    timeout: 30000, // ms
  
    // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
    // headers: {
    //   authorization: 'Basic username:password'
    // },
  
    clientConfig: {
      // Useful if requests are large
      maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
      maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
  
      // Useful to keep a connection alive
      keepalive: true,
      keepaliveInterval: 60000 // ms
    },
  
    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false
    }
};
  
// const web3Ws = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER_LINK, optionsWs))
const web3Ws = new Web3(new Web3.providers.WebsocketProvider(WS_PROVIDER_LINK, optionsWs))

module.exports = {
    web3Ws
}