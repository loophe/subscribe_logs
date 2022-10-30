const fs = require('fs');
var path = require('path')
var spawn = require("child_process").spawn;

function writeHtml (tableInOne) {    
    var i;  
    var html = "";      
    html += '<p><br/>' + 
        '<p>The dYdX flashload related to attack.</p>' +
        '<p>Enjoin it!!<p/><br/>'
        '</p>';

    // Parameters passed in spawn -
    // 1. type_of_script
    // 2. list containing Path of the script
    //    and arguments for the script 
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
    // so, first name = Mike and last name = Will
    var hash = '0x50051e0a6f216ab9484c2080001c7e12d5138250acee1f4b7c725b8fb6bb922d'
    var process = spawn('python',["./transaction.py", hash]);
  
    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        // const dataJ = JSON.parse(data);
        // const dataS = data.toString()
     
        // console.log(dataJ)
        for (  n in tableInOne ){
            var obj = tableInOne[tableInOne.length-n-1]
            var tag = `<a href=https://phalcon.blocksec.com/tx/eth/${obj.tx_hash}>` + obj.tx_hash +"</a>"
            html += '<p><br/>' + 
            '<p>Time : ' + obj.time + '</p>' +
            '<p>id : ' + obj.id + '</p>' +
            '<p>Hash : ' + tag + '</p>' +
            '<p>Transactions :' + data.toString() + '</p><br/>' +
            '</p>';        
        }

        var content = html

        fs.writeFile(path.join(__dirname,'public/', `attack.html`), content, err => {
            if (err) {
            console.error(err)
            return
            }
        })

    } )

    // console.log(`\nAccounts page updated at :`,Date().toLocaleString())         

}

module.exports = {
    writeHtml
}