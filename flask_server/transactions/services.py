from datetime import datetime
from database import db, TransactionData, InstrumentData
from utils import format_datetime


def create_a_transaction(data_obj):
    data = data_obj["data"]
    instrument = InstrumentData.query.filter_by(instrumentId=data["instrumentId"]).first()
    if not instrument:
        return "Instrument does not exist"
    data = TransactionData(data["instrumentId"], data["quantity"],
                           datetime.strptime(data["transactionDate"], "%Y-%m-%d"),
                           data["transactionAmount"], data["transactionType"], instrument.instrumentCurrency)
    db.session.add(data)
    db.session.commit()
    out = {
        "transactionId": data.transactionId,
        "instrumentId": data.instrumentId,
        "quantity": data.quantity,
        "transactionDate": format_datetime(data.transactionDate),
        "transactionAmount": data.transactionAmount,
        "transactionType": data.transactionType,
        "transactionCurrency": data.transactionCurrency,
        "createdAt": data.createdAt.strftime("%Y-%m-%d %H:%M:%S")
    }
    db.session.remove()
    db.session.close()
    return out


def retrieve_a_transaction(transactionId):
    transaction = TransactionData.query.get(transactionId)
    data = transaction.to_map_as_date_string() if transaction else "Not Available"
    return {"data": data}


def retrieve_list_of_transactions():
    transaction_list = TransactionData.query.all()
    transaction_list = [transaction_data.to_map_as_date_string() for transaction_data in transaction_list]
    return {"data": transaction_list}


def delete_a_transaction(transactionId):
    TransactionData.query.filter_by(transactionId=transactionId).delete()
    db.session.commit()
    db.session.remove()
    db.session.close()
    return "Deleted"
