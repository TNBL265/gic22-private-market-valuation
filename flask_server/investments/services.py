from database import db
import pandas as pd
import json
import warnings

warnings.simplefilter(action='ignore', category=FutureWarning)


def retrieve_all_investments(instrumentId):
    transactions = pd.read_sql("SELECT * FROM transaction_table", db.session.bind)
    now = pd.Timestamp.now()
    transactions['transactionDate'] = pd.to_datetime(transactions['transactionDate'])
    transactions = transactions.loc[transactions['isCancelled'] == False]
    transactions = transactions.loc[transactions['instrumentId'] == instrumentId]
    transactions = transactions.loc[transactions['transactionDate'] < now]
    transactions_filtered = transactions[['quantity', 'transactionAmount', 'instrumentId']]

    results = transactions_filtered.groupby('instrumentId').sum()
    result = results.to_json(orient="records")
    parsed = json.loads(result)
    return {"data": parsed}


def refresh_all_investments(instrumentId):
    transactions = pd.read_sql("SELECT * FROM transaction_table", db.session.bind)
    now = pd.Timestamp.now()
    transactions['transactionDate'] = pd.to_datetime(transactions['transactionDate'])
    transactions = transactions.loc[transactions['isCancelled'] == False]
    transactions = transactions.loc[transactions['instrumentId'] == instrumentId]
    transactions = transactions.loc[transactions['transactionDate'] < now]
    transactions_filtered = transactions[['quantity', 'transactionAmount', 'instrumentId']]

    results = transactions_filtered.groupby('instrumentId').sum()
    result = results.to_json(orient="records")
    parsed = json.loads(result)
    return {"data": parsed}
