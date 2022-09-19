import sqlite3
import pandas as pd

conn = sqlite3.connect('local.db')

instruments_df = pd.read_csv("samples/instruments-cleaned.csv")
instruments_df.to_sql("instrument_table", conn, if_exists='append', index=False)

market_values_df = pd.read_csv("samples/market-values-cleaned.csv")
market_values_df.to_sql("market_value_table", conn, if_exists='append', index=False)

transactions_df = pd.read_csv("samples/transactions-cleaned.csv")
transactions_df.to_sql("transaction_table", conn, if_exists='append', index=False)
