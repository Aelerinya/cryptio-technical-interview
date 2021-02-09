import { useState, useEffect } from "react";
import { AddressInfo } from "./AddressInfo";
import { useApi } from "./api";
import type { AddressData } from "./api";

function Address(props: { address: string }): JSX.Element {
  const addressData = useApi<AddressData>(`/address/${props.address}`);

  if (addressData === null) {
    return <></>;
  } else if ("error" in addressData) {
    return <p>{addressData.error}</p>;
  } else {
    return <AddressInfo data={addressData} />;
  }
}

export default Address;
