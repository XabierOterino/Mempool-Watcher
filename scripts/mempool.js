const {ethers} = require("ethers")
require("dotenv").config()


exports.getMempool =  async function(provider , tx){
    const txInfo = await provider.getTransaction(tx)
    return txInfo
   


}

