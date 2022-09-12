const { ethers } = require("ethers")
const {getMempool} = require("./mempool")
require("dotenv").config()

async function init(){
    /*
        This app monitoprizes the mainnet mempool
    */
    const provider1 = new ethers.providers.WebSocketProvider(`wss://eth-goerli.g.alchemy.com/v2/${process.env.API_KEY1}`)
    const provider2 = new ethers.providers.WebSocketProvider(`wss://eth-goerli.g.alchemy.com/v2/${process.env.API_KEY2}`)
    provider1.on('pending' , async(tx) => {
         getMempool(provider2 , tx)
            .then(console.log)
            
    })

}

init()
    