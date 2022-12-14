const {web3Ws} = require('./providerWs.js')
const {request} = require('./request.js')
const {writeHtml} = require('./writeHtml.js')

async function logsWithAddr (topic, oracle){ 
    // var n = 0  
    web3Ws.eth.subscribe('logs',{
        fromBlock: 15981093, 
        address:oracle,
        topics:[topic]
    }, async function(error,result){
        if(!error){
            // console.log(result)       
            const txHash = result.transactionHash
            const blockNumber = result.blockNumber
            // // console.log(txHash)            
            // n++
            const table = await request(txHash,blockNumber)
            console.log(table)         

            writeHtml(table)
        }
    })
}

async function logs (topic){ 
    // var n = 0  
    web3Ws.eth.subscribe('logs',{     
        topics:[topic]
    }, async function(error,result){
        if(!error){
            // console.log(result)       
            const txHash = result.transactionHash
            const blockNumber = result.blockNumber
            // // console.log(txHash)            
            // n++
            const table = await request(txHash,blockNumber)
            console.log(table)         

            writeHtml(table)
        }
    })
}
module.exports = {
    logsWithAddr,
    logs
}

