const { logsWithAddr, logs } = require('./logs')
const {web3Ws} = require('./providerWs')

    
const sig_string1 = 'LogOperation(address)'//dYdX flash loan
const sig_string2 = 'FlashLoan(address,address,uint256,uint256)'//Balancer Vault
const sig_string3 = 'Flash(address,address,uint256,uint256,uint256,uint256)'//UniswapV3Pool 
const sig_string4 = 'FlashLoan(address,address,address,uint256,uint256,uint16)'//AAVE
const sig_string5 = 'LogFlashLoan(address,address,uint256,uint256,address)'//sushi bentoBoxV1
const topic1 = web3Ws.utils.sha3(sig_string1)
// const event_string = 'LiquidityMigrated(address,uint256,uint256,uint256)'//trust swap
const topic2 = web3Ws.utils.sha3(sig_string2)
const topic3 = web3Ws.utils.sha3(sig_string3)
const topic4 = web3Ws.utils.sha3(sig_string4)
const topic5 = web3Ws.utils.sha3(sig_string5)
const topic6 = '0x0b82e93068db15abd9fbb2682c65462ea8a0a10582dce93a5664818e296f54eb'//DODO

const OracleAddress1 = '0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e'//dYdX SoloMargin
const OracleAddress2 = '0xBA12222222228d8Ba445958a75a0704d566BF2C8'//Balancer vault
const OracleAddress3 = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9'//AAVEV2Pool
const OracleAddress4 = '0xF5BCE5077908a1b7370B9ae04AdC565EBd643966'//sushi bentoBoxV1
const OracleAddress5 = '0x22591994bC89174A5bDCeC57C82C881B65f9b121'//DODO

// const OracleAddress4 = ''//AAVEV3Pool
const block0 = 15860272
let trace1 = {
    // address:'dYdX LogOperation',
    oracle:OracleAddress1,
    topic:topic1,
    // block:block0
}  
let trace2 = {
    // address:'Balancer FlashLoan',
    oracle:OracleAddress2,
    topic:topic2,
    // block:block0
}
let trace3 = {
    topic:topic3
}
let trace4 = {
    oracle:OracleAddress3,
    topic:topic4
}

let trace5 = {
    oracle:OracleAddress4,
    topic:topic5
}
let trace6 = {
    oracle:OracleAddress5,
    topic:topic6
}
let traces = []
traces.push(trace1,trace2,trace4,trace5,trace6)
console.log(traces)
traces.forEach((trace)=>{
    // logs(trace.address)
    logsWithAddr(trace.topic, trace.oracle)
})

logs(trace3.topic)
console.log(trace3)
