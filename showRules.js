function showRules (transactions) {
    if 
    (//No show rule 1:
        transactions[1].address === 'MEV-bot'
    ){return false}else{
        if (//No show rule 2:
            transactions[0].address === 'DSProxy'
        ){return false}else{
            if(//No show rule 3:        
                transactions[0].address === 'InstaAccountV2'
            ){return false}else{
                if(//No show rule 4:
                    transactions[0].address === 'InitializableImmutableAdminUpgradeabilityProxy'
                ){return false}else{
                    return true
                }               
            }
        }            
    }
}
module.exports = {
    showRules
}