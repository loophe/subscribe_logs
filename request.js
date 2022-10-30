const axios = require('axios')
const fetchPoint = "http://127.0.0.1:5000"

async function request(hash){
    const result = await axios.get(`${fetchPoint}/tx/${hash}`)
  
        console.log(hash,result.data)

}
module.exports= {
    request
}