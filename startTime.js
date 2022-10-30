const {web3Ws} = require('./providerWs.js')

async function startTime(block){
    const startTimeStampR = await web3Ws.eth.getBlock(block) 
    const timeStamp = startTimeStampR.timestamp
    const date = new Date(timeStamp * 1000)
    return date.toLocaleString()
}
module.exports = {
    startTime
}