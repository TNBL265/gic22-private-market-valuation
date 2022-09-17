from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

market_values_db = SQLAlchemy()


class MarketValueData(market_values_db.Model):
    __tablename__: str = "market_value_table"
    __table_args__ = {"tend_existing": True}

    marketValueId = market_values_db.Column(market_values_db.Integer, primary_key=True, autoincrement=True)
    instrumentId = market_values_db.Column(market_values_db.Integer,
                                           market_values_db.ForeignKey('market_value_table.instrumentId'), nullable=False)
    marketValue = market_values_db.Column(market_values_db.Float, nullable=False)
    marketValueDate = market_values_db.Column(market_values_db.DateTime, nullable=False)
    createdAt = market_values_db.Column(market_values_db.DateTime(timezone=True), server_default=func.now())
    modifiedAt = market_values_db.Column(market_values_db.DateTime(timezone=True), onupdate=func.now())

    def __init__(self, instrumentId, marketValue, marketValueDate):
        self.instrumentId = instrumentId
        self.marketValue = marketValue
        self.marketValueDate = marketValueDate

    def to_map_as_date_string(self):
        return {
            "instrumentId": self.instrumentId,
            "marketValue": self.marketValue,
            "marketValueDate": format_datetime(self.marketValueDate),
            "createdAt": format_datetime(self.createdAt),
            "modifiedAt": format_datetime(self.modifiedAt),
        }


def create_market_value_records(instrumentId, data_obj):
    data = data_obj["data"]
    data_list = []
    for item in data["marketValues"]:
        data_list.append(MarketValueData(instrumentId, item["value"], datetime.strptime(item["date"], "%Y-%m-%d")))
    market_values_db.session.add_all(data_list)
    market_values_db.session.commit()
    market_values_db.session.remove()
    market_values_db.session.close()
    return f"Insert {len(data_list)} records"


def retrieve_market_value_records(instrumentId):
    market_value_list = MarketValueData.query.filter_by(instrumentId=instrumentId).all()
    market_value_list = [market_value_data.to_map_as_date_string() for market_value_data in market_value_list]
    print(market_value_list)
    return {"data": market_value_list}


def update_market_value_records(instrumentId, data_obj):
    MarketValueData.query.filter_by(instrumentId=instrumentId).delete()
    n = create_market_value_records(instrumentId, data_obj)
    return f"Update {n} records"


def format_datetime(datetime: datetime):
    return datetime.strftime("%Y-%m-%d %H:%M:%S") if datetime else ""
