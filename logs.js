const {web3Ws} = require('./providerWs.js')
const {request} = require('./request.js')
const {writeHtml} = require('./writeHtml.js')

async function logs (oracle, topic, block){ 
    // var n = 0  
    web3Ws.eth.subscribe('logs',{
        // fromBlock: block, 
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
module.exports = {
    logs
}

