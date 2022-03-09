/* eslint-disable no-unused-vars */
import Transfer from "./Wallet/components/Transfer";
import Text from "antd/lib/typography/Text";
import { useEffect, useState, useMemo } from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import NativeBalance from "./NativeBalance";
import Address from "./Address/Address";
import Blockie from "./Blockie";
import { Card, Button, Input, notification, Select, Option } from "antd";
import ERC20Transfers from "./ERC20Transfers";

const styles = {
  title: {
    fontSize: "30px",
    fontWeight: "600",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    width: "450px",
    fontSize: "16px",
    fontWeight: "500",
  },
  select: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
  },
  break: {
    display: "block",
  },
};

function HeadsorTails() {
  const { Moralis, chainId, account } = useMoralis();
  const [amount, setAmount] = useState();
  const [side, setSide] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const ethers = Moralis.web3Library;
  // async function getContractBalance() {
  //   let web3Provider = await Moralis.enableWeb3();
  //   let contractInstance = new ethers.Contract(
  //     "0x9F199957E2B6Fb97971C8386027266E1c8bae00d",
  //     abi,
  //     web3Provider,
  //   );
  //   let a = await contractInstance.getBalance();
  //   console.log(a);
  //   setContractBalance(a);
  // }
  // const calculation = useMemo(() => getContractBalance(), [contractBalance]);
  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "bet",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "bool",
          name: "win",
          type: "bool",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "side",
          type: "uint8",
        },
      ],
      name: "bet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "funding",
          type: "uint256",
        },
      ],
      name: "funded",
      type: "event",
    },
    {
      inputs: [],
      name: "ContractBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
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
      constant: true,
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "side",
          type: "uint8",
        },
      ],
      name: "flip",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
    {
      inputs: [],
      name: "withdrawAll",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "fundContract",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
  ];

  async function flip() {
    alert(side + " " + amount);
    let web3Provider = await Moralis.enableWeb3();
    let contractInstance = new ethers.Contract(
      "0x9F199957E2B6Fb97971C8386027266E1c8bae00d",
      abi,
      web3Provider.getSigner(),
    );
    // let contractInstance = new web3.eth.Contract(window.abi,"0x06eE0Cbd7821C89416Dc606D8440eb688f93b416")
    // let contractInstance = await ethereum.request({method: 'contract', params:[{jsonInterface:window.abi, address:"0x06eE0Cbd7821C89416Dc606D8440eb688f93b416" }] })
    contractInstance.on("bet", (user, bet, win, side) => {
      console.log(user, bet, win, side);
    });
    console.log(contractInstance);
    await contractInstance.flip(side, {
      value: amount,
      from: account,
      gasLimit: 99999,
    });
    let a = await contractInstance.getBalance();
    console.log(a);
    setContractBalance(a);
  }
  function handleChange(value) {
    if (value === "Heads") setSide(1);
    if (value === "Tails") setSide(-1);
    console.log(value, side);
  }
  useEffect(() => {
    console.log(side);
    console.log(amount);
    console.log(contractBalance);
  }, [side, amount, contractBalance]);
  // useEffect(() => {
  //   async () => {
  //     console.log(await getContractBalance());
  //   };
  //   console.log(contractBalance);
  // }, [contractBalance]);
  return (
    <>
      <Card
        style={styles.card}
        title={
          <div style={styles.header}>
            <Blockie scale={5} avatar currentWallet style />
            <Address size="6" copyable />
            <p>
              Address Balance:{" "}
              {parseFloat(Moralis.Units.FromWei(contractBalance)).toFixed(6)}
            </p>
            <NativeBalance />
          </div>
        }
      >
        <div style={{ alignItems: "center", width: "100%" }}>
          <div style={styles.tranfer}>
            <div style={styles.header}>
              <h3>Heads or tails Win to double</h3>
            </div>
            <div style={styles.select}>
              <div style={styles.textWrapper}>
                <Text strong>Heads or tails:</Text>
                <Select onChange={handleChange} size="large">
                  <Select.Option value="Heads">Heads</Select.Option>
                  <Select.Option value="Tails">Tails</Select.Option>
                </Select>
              </div>
            </div>
            <div style={styles.select}>
              <div style={styles.textWrapper}>
                <Text strong>Amount:</Text>
              </div>
              <Input
                size="large"
                onChange={(e) => {
                  setAmount(`${e.target.value}`);
                }}
              />
            </div>
            <Button
              type="primary"
              size="large"
              // loading={isPending}
              style={{ width: "100%", marginTop: "25px" }}
              onClick={() => flip()}
              // disabled={!tx}
            >
              Place bet
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default HeadsorTails;
