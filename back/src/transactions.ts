import axios from "axios";

type Input = {
  prev_out: {
    addr: string;
    value: number;
  };
};

type Output = {
  addr: string;
  value: number;
};

type Transaction = {
  inputs: Input[];
  out: Output[];
  time: number;
  block_height: number;
};

type RawAddressInfo = {
  hash160: string;
  address: string;
  final_balance: number;
  txs: Transaction[];
};

type HistoricalBalance = {
  starting_balance: number;
  time: number;
  end_balance: number;
};

export type AddressInfo = {
  address: string;
  final_balance: number;
  balances: HistoricalBalance[];
};

function computeHistoricalBalances(
  address: string,
  transactions: Transaction[]
): HistoricalBalance[] {
  let historical_balances: HistoricalBalance[] = [];
  let balance = 0;

  const transactions_sorted = transactions.sort(
    (a, b) => a.block_height - b.block_height
  );

  for (const transaction of transactions_sorted) {
    const starting_balance = balance;
    for (const input of transaction.inputs) {
      if (input.prev_out.addr === address) {
        balance -= input.prev_out.value;
      }
    }
    for (const output of transaction.out) {
      if (output.addr === address) {
        balance += output.value;
      }
    }
    historical_balances.push({
      starting_balance: starting_balance,
      time: transaction.time,
      end_balance: balance,
    });
  }
  return historical_balances;
}

async function getAddressTransactionsPage(
  address: string,
  page: number = 0
): Promise<Transaction[]> {
  const limit = 50;
  const offset = page * limit;
  const response = await axios.get(
    `https://blockchain.info/rawaddr/${address}?limit=${limit}&offset=${offset}`
  );
  const body = response.data as RawAddressInfo;
  return body.txs;
}

async function getAddressTransactions(address: string): Promise<Transaction[]> {
  let transactions = [];
  let pageNumber = 0;
  while (true) {
    const page = await getAddressTransactionsPage(address, pageNumber);
    if (page.length > 0) {
      transactions.push(...page);
      pageNumber++;
    } else {
      break;
    }
  }
  return transactions;
}

export async function getAddressInformations(
  address: string
): Promise<AddressInfo> {
  const response = await axios.get(
    `https://blockchain.info/rawaddr/${address}?limit=0`
  );
  const body = response.data as RawAddressInfo;
  const transactions = await getAddressTransactions(address);
  const balances = computeHistoricalBalances(address, transactions);
  return {
    address: body.address,
    final_balance: body.final_balance,
    balances: balances,
  };
}
