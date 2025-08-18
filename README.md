# Voting Dapp

This is a DApp project constructed with React + Javascript (frontend) and Hardhat + Solidity (backend) to select candidates to apprendiceship program at Subvisual

## Starting:

### You will need:
<li>To have MetaMask installed and an account

### Installing:
first of all, clone the repo
```bash
git clone https://github.com/seu-usuario/voting-dapp-subvisual.git
```
install the dependencies
```shell
npm install
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

```
then, copy the contract address exibited in the terminal
```text
EX: voting contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```
paste it on <strong> src/App.jsx </strong> file
```text
const contractAddress = "...insert address here..."; // 
```
start the app
```bash
cd frontend
npm run dev
```

## Important points
<li>the app expects you to be using Hardhat local network (chainId 31337) </li>
<li>there's a little joke in it :)

## Testing
tests include:
<li>each person can only vote once</li>
<li>the votes should be counted correctly</li>

to run the tests use:
```bash
npx hardhat test
```

## Technical decisions
<li>Hardhat: allouds to test without real ETH</li>
<li>toast: better UX, less intrusive than alerts</li>

#


<img width="1837" height="852" alt="Captura de tela 2025-08-18 173417" src="https://github.com/user-attachments/assets/48a3863a-cda3-4929-bbc8-f497932e9d39" />
<img width="1843" height="863" alt="Captura de tela 2025-08-18 173310" src="https://github.com/user-attachments/assets/116fd2e8-9780-4b76-ae59-a5ee74793fb4" />
