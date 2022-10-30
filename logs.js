const {web3Ws} = require('./providerWs.js')
// const { startTime } = require('./startTime.js')
const {request} = require('./request.js')
// const { writeHtml } = require('./writeHtml.js')

async function logs (oracle, topic, block){ 
    var n = 0
    web3Ws.eth.subscribe('logs',{
        fromBlock: block, 
        address:oracle,
        topics:[topic]
    }, async function(error,result){
        if(!error){
            // console.log(result)       
            const txHash = result.transactionHash
            // console.log(txHash)
            // const blackNumber = result.blockNumber
            // const blockTime = await startTime(blackNumber)
            n++
            await request(txHash)
            // tableInOne.push( {"time": blockTime, "id": n , "tx_hash":txHash })    
            // console.log(tableInOne)

            // writeHtml(tableInOne)
        }
    })
}
module.exports = {
    logs
}

