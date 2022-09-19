from database import db
import pandas as pd
import numpy as np
import json
import warnings

warnings.simplefilter(action='ignore', category=FutureWarning)


def retrieve_total_market_values(start, end, instrumentId):
    instruments = pd.read_sql("SELECT * FROM instrument_table", db.session.bind)
    market_values = pd.read_sql("SELECT * FROM market_value_table", db.session.bind)
    market_values["marketValueDate"] = pd.to_datetime(market_values["marketValueDate"])
    start_date = pd.Timestamp(formatDateString(start))
    end_date = pd.Timestamp(formatDateString(end))
    merged_df = pd.merge(left=market_values, right=instruments, left_on="instrumentId", right_on="instrumentId")
    merged_df = merged_df[["instrumentId", "instrumentName", "marketValue", "marketValueDate"]]
    merged_df = merged_df.loc[merged_df["instrumentId"] == instrumentId]
    merged_df = merged_df.loc[(merged_df["marketValueDate"] > start_date) & (merged_df["marketValueDate"] < end_date)]

    result = merged_df.to_json(orient="records")
    parsed = json.loads(result)
    return {"data": parsed}


def retrieve_all_pnl_breakdown(date):
    market_values = pd.read_sql("SELECT * FROM market_value_table", db.session.bind)
    transactions = pd.read_sql("SELECT * FROM transaction_table", db.session.bind)
    end_date = pd.Timestamp(formatDateString(date))
    market_values["marketValueDate"] = pd.to_datetime(market_values["marketValueDate"])
    market_values_less = market_values.loc[market_values["marketValueDate"] <= end_date]
    instrument_ids_list = list(set(market_values_less["instrumentId"].tolist()))
    market_values_all_instruments = pd.DataFrame(
        columns=["instrumentId", "marketValueDate", "marketValue", "createdAt"])
    for id in instrument_ids_list:
        instrument_marketValues = market_values_less.loc[market_values["instrumentId"] == id]
        closest_value_idx = instrument_marketValues.loc[
            instrument_marketValues["marketValueDate"] == nearest(instrument_marketValues["marketValueDate"].to_list(),
                                                                  end_date)].index[0]
        market_values_all_instruments = market_values_all_instruments.append(market_values.iloc[closest_value_idx])

    transactions["transactionDate"] = pd.to_datetime(transactions["transactionDate"])
    transactions = transactions.loc[(transactions["transactionDate"] < end_date)]
    transactions = transactions[["instrumentId", "transactionAmount", "quantity", "transactionDate"]]

    cumulative_transactions = pd.DataFrame(transactions.groupby("instrumentId").sum())
    market_values_all_instruments["netprofitloss"] = 0
    for id in instrument_ids_list:
        marketValue = (market_values_all_instruments.loc[market_values_all_instruments["instrumentId"] == id])[
            "marketValue"]
        quantity = (cumulative_transactions.iloc[id - 1])["quantity"]
        transaction_amount = (cumulative_transactions.iloc[id - 1])["transactionAmount"]
        try:
            market_values_all_instruments.iloc[[id - 1], [5]] = marketValue * (quantity / 100.0) + transaction_amount
        except KeyError:
            continue
    results = market_values_all_instruments[["netprofitloss", "instrumentId"]]
    result = results.to_json(orient="records")
    parsed = json.loads(result)
    return {"data": parsed}


def retrieve_single_pnl_breakdown(start, end, instrumentId):
    market_values = pd.read_sql("SELECT * FROM market_value_table", db.session.bind)
    transactions = pd.read_sql("SELECT * FROM transaction_table", db.session.bind)
    start_date = pd.Timestamp(formatDateString(start))
    end_date = pd.Timestamp(formatDateString(end))
    market_values["marketValueDate"] = pd.to_datetime(market_values["marketValueDate"])
    market_values = market_values.loc[market_values["instrumentId"] == instrumentId]
    market_values = market_values.loc[
        (market_values["marketValueDate"] > start_date) & (market_values["marketValueDate"] < end_date)]
    market_values = market_values.reset_index()
    date_array = market_values["marketValueDate"].tolist()
    market_values["cumulative_quantity"] = ""
    market_values["asset_value"] = ""
    market_values["cumulative_transaction_amount"] = ""
    market_values["net_profitloss"] = ""

    transactions = transactions.loc[transactions["instrumentId"] == instrumentId]
    transactions["transactionDate"] = pd.to_datetime(transactions["transactionDate"])
    transactions = transactions.loc[(transactions["transactionDate"] < end_date)]
    transactions = transactions[["instrumentId", "transactionAmount", "quantity", "transactionDate"]]
    count = 0
    for each in date_array:
        transactions_filtered = transactions.loc[(transactions["transactionDate"] <= each)]
        transactions_filtered = transactions_filtered.groupby(["instrumentId"]).sum()
        market_values.at[count, "cumulative_quantity"] = transactions_filtered["quantity"].iloc[0]
        if np.isnan(market_values.at[count, "cumulative_quantity"]):
            market_values.at[count, "cumulative_quantity"] = 0
        market_values.at[count, "cumulative_transaction_amount"] = transactions_filtered["transactionAmount"].iloc[0]
        market_values.at[count, "asset_value"] = (int(float(market_values["cumulative_quantity"].iloc[count])) / 100) * \
                                                 market_values["marketValue"].iloc[count]
        market_values.at[count, "net_profitloss"] = abs(market_values["cumulative_transaction_amount"].iloc[count] + \
                                                    market_values["asset_value"].iloc[count])
        count += 1

    results = market_values[["marketValueDate", "net_profitloss"]]
    result = results.to_json(orient="records")
    parsed = json.loads(result)
    return {"data": parsed}


def nearest(items, pivot):
    return pd.to_datetime(min([i for i in items], key=lambda x: abs(x - pivot)))


def formatDateString(date):
    if "-" in date:
        return "".join(date.split("-"))
    return date
