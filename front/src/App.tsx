import { useState } from "react";
import Address from "./Address";
import ApiStatus from "./ApiStatus";

function App(): JSX.Element {
  const [addressInput, setAddressInput] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div style={{ maxWidth: "42em", margin: "0 auto" }}>
      <p style={{ fontWeight: "bold" }}>Bitcoin Historical Balances</p>
      <input
        type="text"
        placeholder="Please input a valid Bitcoin address"
        value={addressInput}
        onChange={(e) => setAddressInput(e.target.value)}
      />
      <input
        style={{ marginLeft: "1em" }}
        type="submit"
        value="Go!"
        onClick={(e) => setAddress(addressInput)}
      />

      {address !== "" ? (
        <Address address={address} />
      ) : (
        <p>There is no address...</p>
      )}

      <hr />

      <ApiStatus/>
    </div>
  );
}

export default App;
