import axios from "axios";
import { useState, useEffect } from "react";

function ApiStatus(): JSX.Element {
  const [APIIsLive, setAPIIsLive] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/ping")
      .then((resp) => setAPIIsLive(resp.data === "pong"))
      .catch((err) => {
        console.error(err);
        setAPIIsLive(false);
      });
  }, []);

  if (APIIsLive) {
    return <p>The API is live!</p>;
  } else {
    return <p style={{ color: "red" }}>The API did not respond...</p>;
  }
}

export default ApiStatus;
