const fs = require('fs');
var path = require('path')
const { showRules } = require('./showRules.js')

async function writeHtml (tableInOne) {  
    var html = "";      
    html += 
        '<head> <meta charset="UTF-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"><title>FlaskBlog</title> </head>' +
        
        '<h3>The flashloan related attack analyser.</h3>' +
        '<h4>AAVE UniswapV3 dYdX balancer </h4>' +  
        '<h4>sushi bentoBox DODO included <h4/>' +  
        '<h4>On Ethereum mainnet enjoy it!!</h4>'     

    for (  n in tableInOne ){
        var obj = tableInOne[tableInOne.length-n-1]
        var tag = `<a href=https://phalcon.blocksec.com/tx/eth/${obj.tx_hash}>` + obj.tx_hash +"</a>"
        var transactionObject = obj.transactions
        var transaction0 = `<p style="line-height:50%">from : ${transactionObject[0].id} = ${transactionObject[0].address}</p>`
        var isToBeShown = showRules(transactionObject)
        if ( isToBeShown ){
     
            html += '<p><br/>' + 
            '<p style="line-height:80%">Time : ' + obj.time + '</p>' +
            '<p style="line-height:80%">id : ' + obj.id + '</p>' +
            '<p style="line-height:80%">Hash : ' + tag + '</p>' +
            '<p style="line-height:50%">Transactions :' + transaction0 + 
            '</p>';        

            for ( i in transactionObject ) {
                // 
                if (i>0){
                    let id = transactionObject[i].id
                    if (id == 1){
                        var transaction = `<p style="line-height:50%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${transactionObject[i].id} = ${transactionObject[i].address}</p>`
                        html += transaction;  
                    } 
                    if (id == 2){
                        var transaction = `<p style="line-height:50%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${transactionObject[i].id} = ${transactionObject[i].address}</p>`
                        html += transaction;  
                    }  
                    if (id == 3){
                        var transaction = `<p style="line-height:50%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${transactionObject[i].id} = ${transactionObject[i].address}</p>`
                        html += transaction;  
                    }   
                    if (id == 4){
                        var transaction = `<p style="line-height:50%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${transactionObject[i].id} = ${transactionObject[i].address}</p>`
                        html += transaction;  
                    } 
                    if (id == 5){
                        var transaction = `<p style="line-height:50%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${transactionObject[i].id} = ${transactionObject[i].address}</p>`
                        html += transaction;  
                    }  
                }  
            }
        }
    }

    var content = html

    fs.writeFile(path.join(__dirname,'templates/', `index.html`), content, err => {
        if (err) {
        console.error(err)
        return
        }
    })
}

module.exports = {
    writeHtml
}