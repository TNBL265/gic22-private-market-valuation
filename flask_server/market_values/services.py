from datetime import datetime
from database import db, MarketValueData


def create_market_value_records(instrumentId, data_obj):
    data = data_obj["data"]
    data_list = []
    for item in data["marketValues"]:
        data_list.append(MarketValueData(instrumentId, item["value"], datetime.strptime(item["date"], "%Y-%m-%d")))
    db.session.add_all(data_list)
    db.session.commit()
    db.session.remove()
    db.session.close()
    return f"Insert {len(data_list)} records"


def retrieve_market_value_records(instrumentId):
    market_value_list = MarketValueData.query.filter_by(instrumentId=instrumentId).all()
    market_value_list = [market_value_data.to_map_as_date_string() for market_value_data in market_value_list]
    return {"data": market_value_list}


def update_market_value_records(instrumentId, data_obj):
    MarketValueData.query.filter_by(instrumentId=instrumentId).delete()
    n = create_market_value_records(instrumentId, data_obj)
    return f"Update {n} records"
