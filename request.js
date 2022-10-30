const axios = require('axios')
const fetchPoint = "http://127.0.0.1:5000"
const { startTime } = require('./startTime.js')

var tableInOne = []
var n = 1

async function request(hash, blockNumber){       
    try{
        const result = await axios.get(`${fetchPoint}/tx/${hash}`) 
        const blockTime = await startTime(blockNumber)
        tableInOne.push( {"time": blockTime, "id": n , "tx_hash":hash, "block":blockNumber, "transactions": result.data }) 
        n ++
        return tableInOne
    }catch(e){
        console.log('status',e.response.status)
        console.log('statusText',e.response.statusText)
    }       
}
module.exports= {
    request
}