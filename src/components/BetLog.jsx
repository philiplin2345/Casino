/* eslint-disable no-unused-vars */
import { useMoralis, useERC20Balances, useMoralisQuery } from "react-moralis";
import { Skeleton, Table } from "antd";
import { getEllipsisTxt } from "../helpers/formatters";

function BetLog(props) {
  const { data: assets } = useERC20Balances(props);
  const { Moralis } = useMoralis();
  const { data: flips } = useMoralisQuery("Flips");
  const fetchFlips = JSON.parse(
    JSON.stringify(flips, ["user", "address", "bet", "side", "win"]),
  );
  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user) => getEllipsisTxt(user, 8),
    },
    {
      title: "Bet (ETH)",
      dataIndex: "bet",
      key: "bet",
      render: (bet) => Moralis.Units.FromWei(bet, 18),
    },
    {
      title: "Side",
      dataIndex: "side",
      key: "side",
      render: (side) => (side === 1 ? "Heads" : "Tails"),
    },
    {
      title: "Win",
      dataIndex: "win",
      key: "win",
      render: (win) => (win ? "Won" : "Lost"),
    },
  ];
  console.log(fetchFlips);
  return (
    <div style={{ width: "65vw", padding: "15px" }}>
      <h1>💰Bet Log</h1>
      <Skeleton loading={!fetchFlips}>
        <Table
          dataSource={fetchFlips}
          columns={columns}
          rowKey={(record) => {
            return record.token_address;
          }}
        />
      </Skeleton>
    </div>
  );
}
export default BetLog;
