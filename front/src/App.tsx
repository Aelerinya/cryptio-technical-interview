import axios from "axios";
import { useState } from "react";
import Address from "./Address";

function App(): JSX.Element {
  const [addressInput, setAddressInput] = useState("");
  const [address, setAddress] = useState("");
  const [APIIsLive, setAPIIsLive] = useState(false);

  useState(() => {
    axios
      .get("http://localhost:8080/ping")
      .then((resp) => setAPIIsLive(resp.data === "pong"))
      .catch((err) => {
        console.error(err);
        setAPIIsLive(false);
      });
  });

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
      {APIIsLive ? (
        <p>The API is live!</p>
      ) : (
        <p style={{ color: "red" }}>The API did not respond...</p>
      )}
    </div>
  );
}

export default App;
