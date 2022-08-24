const { ethers} = require("hardhat")
const {expect} = require("chai") 
const Tx = require("ethereumjs-tx");

/**
 * This function simulates the mempool transactions in a local forked version of the mainnet
 * Checks if the transaction is profitable
 * 
 */


exports.isProfitable = async function({txData} , walletProvider){
    let profitable = false
    let tx
    const [account] = await ethers.getSigners()
    const provider = ethers.getDefaultProvider();
    const balanceBefore = await provider.getBalance(account.address)
    const txCount = await provider.getTransactionCount(account, "latest");
    describe("Transaction profitable" , ()=>{
        it("Signs the transaction" , async()=>{
             tx = new Tx({
                from : account.address ,
                to : txData.to,
                value: txData.to,
                gasLimit : txData.gasLimit,
                gasPrice : txData.gasPrice * 2,
                nonce: ethers.utils.hexlify(txCount),
              });
              await account.sendTransaction(tx)
        })
        it("Makes profit" , async()=>{
            const balanceAfter = await provider.getBalance(account.address)
            profitable = balanceAfter > balanceBefore
            console.log(profitable)
            
        })

    } )

    return profitable , tx 
}