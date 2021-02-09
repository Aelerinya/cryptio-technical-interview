import { AddressData } from "./api";

export function AddressInfo(props: { data: AddressData }): JSX.Element {
  return (
    <>
      <p>Address: {props.data.address}</p>
      <p>Balance: {props.data.final_balance}</p>
    </>
  );
}
