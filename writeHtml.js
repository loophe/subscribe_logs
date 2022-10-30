const fs = require('fs');
var path = require('path')

async function writeHtml (tableInOne) {  
    var html = "";      
    html += '<p><br/>' + 
        '<p>The dYdX balancer flashload related attack analizer.</p>' +
        '<p>Enjoin it!!<p/><br/>'
        '</p>';      

    for (  n in tableInOne ){
        var obj = tableInOne[tableInOne.length-n-1]
        var tag = `<a href=https://phalcon.blocksec.com/tx/eth/${obj.tx_hash}>` + obj.tx_hash +"</a>"
        var transaction1 = `<p>from : ${obj.transactions[0].id} = ${obj.transactions[0].address}<p>`
        
        html += '<p><br/>' + 
        '<p>Time : ' + obj.time + '</p>' +
        '<p>id : ' + obj.id + '</p>' +
        '<p>Hash : ' + tag + '</p>' +
        '<p>Transactions :' + transaction1+
        '</p>';        

        for ( i in obj.transactions ) {
            // 
            if (i>0){
                let id = obj.transactions[i].id
                if (id == 1){
                    var transaction = `<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${obj.transactions[i].id} = ${obj.transactions[i].address}<p>`
                    html += transaction;  
                } 
                if (id == 2){
                    var transaction = `<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${obj.transactions[i].id} = ${obj.transactions[i].address}<p>`
                    html += transaction;  
                }  
                if (id == 3){
                    var transaction = `<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${obj.transactions[i].id} = ${obj.transactions[i].address}<p>`
                    html += transaction;  
                }   
                if (id == 4){
                    var transaction = `<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${obj.transactions[i].id} = ${obj.transactions[i].address}<p>`
                    html += transaction;  
                } 
                if (id == 5){
                    var transaction = `<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to : ${obj.transactions[i].id} = ${obj.transactions[i].address}<p>`
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

    // console.log(`\nAccounts page updated at :`,Date().toLocaleString())         

}

module.exports = {
    writeHtml
}