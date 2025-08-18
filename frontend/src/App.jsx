import { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const contractABI = [
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_candidates",
        type: "string[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "option",
        type: "uint256",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },

  {
    inputs: [],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_candidate",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "votes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCandidates",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
];

const App = () => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState([]);

  const getContract = (signer = false) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return new ethers.Contract(
      contractAddress,
      contractABI,
      signer ? provider.getSigner() : provider
    );
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      return alert("install MetaMask to use this app");
    }
    try {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);
      setConnected(true);

      toast.success("connected to MetaMask");
      await loadContractData();
    } catch (err) {
      console.error("some error ocurred:", err);
      setOptions(["carolina", "other"]);
      setVotes([0, 0]);
    }
  };

  const loadContractData = async () => {
    try {
      const contract = getContract();
      const candidates = await contract.getCandidates();
      const votesBN = await contract.getVotes();
      setOptions(candidates);
      setVotes(votesBN.map((v) => v.toNumber()));
    } catch (err) {
      console.error("the contract has an error:", err);
      setOptions(["carolina", "other"]);
      setVotes([0, 0]);
    }
  };

  const handleVote = async (optionIndex) => {
    try {
      toast("confirm in your wallet");

      const contract = getContract(true);
      const tx = await contract.vote(optionIndex, { gasLimit: 300000 });
      await tx.wait();

      const updatedVotes = await contract.getVotes();
      setVotes(updatedVotes.map((v) => v.toNumber()));
    } catch (err) {
      console.error("some error ocurred:", err);
      toast.error(`some error ocurred: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <h1>
        who do you vote to enter in <br /> Subvisual's apprenticeship role?
      </h1>

      {!connected ? (
        <button onClick={connectWallet}>
          connect MetaMask whallet to vote
        </button>
      ) : (
        <div>
          <p className="account-info">
            connected as: {account.slice(0, 6)}...{account.slice(-4)}
          </p>

          <h2>vote for your favorite option:</h2>
          <div className="options-list">
            {options.length === 0 && <div>loading options...</div>}
            {options.map((option, index) => (
              <div key={index} className="option-item">
                {option} <br /> votes:
                {votes[index]}
                <button
                  onClick={() => handleVote(index)}
                  onMouseEnter={(e) => {
                    if (option === "other") {
                      const largura = window.innerWidth - 120;
                      const altura = window.innerHeight - 50;
                      const newX = Math.random() * largura;
                      const newY = Math.random() * altura;

                      const btn = e.currentTarget;
                      btn.style.position = "absolute";
                      btn.style.left = `${newX}px`;
                      btn.style.top = `${newY}px`;
                    }
                  }}
                >
                  vote!
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
