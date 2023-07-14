   
   function Interact(){
   const { Web3 } = require('web3'); //  web3.js has native ESM builds and (`import Web3 from 'web3'`)

    // Set up a connection to the Ethereum network
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.Contract.handleRevert = true;



    // Create a new contract object using the ABI and bytecode
    const abi = require('C:/Users/Administrator/OneDrive/Desktop/e-learn-blockchain/e-learn1/src/artifacts/contracts/Payment.sol/PaymentContract.json');
    const MyContract = new web3.eth.Contract( [
        {
          "inputs": [],
          "stateMutability": "payable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "_sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "_receiver",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "PaymentSent",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "getBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address payable",
              "name": "_receiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "sendPayment",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "sender",
          "outputs": [
            {
              "internalType": "address payable",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ], "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512");
    console.log(MyContract)
    async function interact() {
        const providersAccounts = await web3.eth.getAccounts();
        const defaultAccount = providersAccounts[0];
        console.log(providersAccounts);
        try {
            // Get the current value of my number
            const myNumber = await MyContract.methods.getBalance().call();
            console.log('my number value: ' + myNumber);
            const address='0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
            // // Increment my number
            const receipt = await MyContract.methods.sendPayment(address,100 ).call()
            console.log('Transaction Hash: ' + receipt.transactionHash);

            // // Get the updated value of my number
            // const myNumberUpdated = await MyContract.methods.getBalance().call();
            // console.log('my number updated value: ' + myNumberUpdated);
        } catch (error) {
            console.error(error);
        }
    }
    interact()
}

    export default Interact;