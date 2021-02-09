import { useMemo } from "react";
import type { AddressData } from "./api";

function BalanceHistory(props: { data: AddressData }): JSX.Element {
  const balances = props.data.balances.map((balance) => {
    const transactionSignClass =
      balance.end_balance > balance.starting_balance ? "positive" : "negative";
    return (
      <tr key={balance.time}>
        <td>{new Date(balance.time).toISOString()}</td>
        <td>{balance.starting_balance}</td>
        <td>
          <span className={transactionSignClass}>
            {balance.end_balance - balance.starting_balance}
          </span>
        </td>
        <td>{balance.end_balance}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Time of transaction</th>
          <th>Old balance</th>
          <th>Transaction value</th>
          <th>New balance</th>
        </tr>
      </thead>
      <tbody>{balances}</tbody>
    </table>
  );
}

export default BalanceHistory;
