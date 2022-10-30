const { logs } = require('./logs')
const {web3Ws} = require('./providerWs')

    
const sig_string1 = 'LogOperation(address)'//dYdX flash loan
const sig_string2 = 'FlashLoan(address,address,uint256,uint256)'
const topic1 = web3Ws.utils.sha3(sig_string1)
// const event_string = 'LiquidityMigrated(address,uint256,uint256,uint256)'//trust swap
const topic2 = web3Ws.utils.sha3(sig_string2)
const OracleAddress1 = '0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e'//dYdX SoloMargin
const OracleAddress2 = '0xBA12222222228d8Ba445958a75a0704d566BF2C8'//Balancer vault
const block0 = 15860272
let trace1 = {
    // address:'dYdX LogOperation',
    oracle:OracleAddress1,
    topic:topic1,
    block:block0
}  
let trace2 = {
    // address:'Balancer FlashLoan',
    oracle:OracleAddress2,
    topic:topic2,
    block:block0
}

let traces = []
traces.push(trace1,trace2)
console.log(traces)
traces.forEach((trace)=>{
    // logs(trace.address)
    logs(trace.oracle,trace.topic,trace.block)
})
