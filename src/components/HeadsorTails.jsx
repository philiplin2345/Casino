/* eslint-disable no-unused-vars */
import Transfer from "./Wallet/components/Transfer";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import NativeBalance from "./NativeBalance";
import Address from "./Address/Address";
import Blockie from "./Blockie";
import { Card, Button, Input, notification, Select, Option } from "antd";

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
};

function HeadsorTails() {
  const [amount, setAmount] = useState();
  const [side, setSide] = useState(0);
  async function flip(side) {
    // let amount = document.getElementById("amount").value;
    // alert(side + " " + amount);
    // let web3Provider = await Moralis.enableWeb3();
    // console.log(web3.version);
    // let contractInstance = new ethers.Contract(
    //   "0xA744aF6bD7767738dDE56C18626CF8282eA5A035",
    //   window.abi,
    //   web3Provider.getSigner(),
    // );
    // // let contractInstance = new web3.eth.Contract(window.abi,"0x06eE0Cbd7821C89416Dc606D8440eb688f93b416")
    // // let contractInstance = await ethereum.request({method: 'contract', params:[{jsonInterface:window.abi, address:"0x06eE0Cbd7821C89416Dc606D8440eb688f93b416" }] })
    // contractInstance.on("bet", (user, bet, win, side) => {
    //   console.log(user, bet, win, side);
    // });
    // console.log(contractInstance);
    // let results = contractInstance.flip(side == "heads" ? 0 : 1, {
    //   value: amount,
    //   from: ethereum.selectedAddress,
    //   gasLimit: 99999,
    // });
  }
  function handleChange(value) {
    if (value === "Heads") setSide(1);
    if (value === "Tails") setSide(-1);
    console.log(value, side);
  }
  useEffect(() => {
    console.log(side);
    console.log(amount);
  }, [side, amount]);
  return (
    <Card
      style={styles.card}
      title={
        <div style={styles.header}>
          <Blockie scale={5} avatar currentWallet style />
          <Address size="6" copyable />
          <NativeBalance />
        </div>
      }
    >
      <div style={styles.card}>
        <div style={styles.tranfer}>
          <div style={styles.header}>
            <h3>Heads or tails win to double</h3>
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
  );
}

export default HeadsorTails;
