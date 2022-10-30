const fs = require('fs');
var path = require('path')

async function writeHtml (tableInOne) {  
    var html = "";      
    html += 
        '<head> <meta charset="UTF-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"><title>FlaskBlog</title> </head>' +
        
        '<h3>The flashload related attack analyser.</h3>' +
        '<h4>dYdX balancer included </h4>'
        '<h4>Enjoy it!!</h4>'     

    for (  n in tableInOne ){
        var obj = tableInOne[tableInOne.length-n-1]
        var tag = `<a href=https://phalcon.blocksec.com/tx/eth/${obj.tx_hash}>` + obj.tx_hash +"</a>"
        var transaction1 = `<p style="line-height:50%">from : ${obj.transactions[0].id} = ${obj.transactions[0].address}</p>`
        
        html += '<p><br/>' + 
        '<p style="line-height:80%">Time : ' + obj.time + '</p>' +
        '<p style="line-height:80%">id : ' + obj.id + '</p>' +
        '<p style="line-height:80%">Hash : ' + tag + '</p>' +
        '<p style="line-height:50%">Transactions :' + transaction1 + 
        '</p>';        

        for ( i in obj.transactions ) {
            // 
            if (i>0){
                let id = obj.transactions[i].id
                if (id == 1){
                    var transaction = `<p style="line-height:50%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${obj.transactions[i].id} = ${obj.transactions[i].address}</p>`
                    html += transaction;  
                } 
                if (id == 2){
                    var transaction = `<p style="line-height:50%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${obj.transactions[i].id} = ${obj.transactions[i].address}</p>`
                    html += transaction;  
                }  
                if (id == 3){
                    var transaction = `<p style="line-height:50%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${obj.transactions[i].id} = ${obj.transactions[i].address}</p>`
                    html += transaction;  
                }   
                if (id == 4){
                    var transaction = `<p style="line-height:50%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${obj.transactions[i].id} = ${obj.transactions[i].address}</p>`
                    html += transaction;  
                } 
                if (id == 5){
                    var transaction = `<p style="line-height:50%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${obj.transactions[i].id} = ${obj.transactions[i].address}</p>`
                    html += transaction;  
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