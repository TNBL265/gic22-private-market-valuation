from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

instruments_db = SQLAlchemy()


class InstrumentData(instruments_db.Model):
    __tablename__: str = "instrument_table"
    __table_args__ = {"tend_existing": True}

    instrumentId = instruments_db.Column(instruments_db.Integer, primary_key=True, autoincrement=True)
    instrumentName = instruments_db.Column(instruments_db.String, nullable=False)
    instrumentType = instruments_db.Column(instruments_db.String, nullable=False)
    country = instruments_db.Column(instruments_db.String, nullable=False)
    sector = instruments_db.Column(instruments_db.String, nullable=False)
    instrumentCurrency = instruments_db.Column(instruments_db.String, nullable=False)
    isTradeable = instruments_db.Column(instruments_db.Boolean, nullable=False)
    createdAt = instruments_db.Column(instruments_db.DateTime(timezone=True), server_default=func.now())
    modifiedAt = instruments_db.Column(instruments_db.DateTime(timezone=True), onupdate=func.now())
    notes = instruments_db.Column(instruments_db.String, nullable=True)
    market_value = instruments_db.relationship('MarketValue', lazy='select',
                                               backref=instruments_db.backref('instrument', lazy='joined'))

    def __init__(self, instrumentName, instrumentType, country, sector, instrumentCurrency, isTradeable, notes):
        self.instrumentName = instrumentName
        self.instrumentType = instrumentType
        self.country = country
        self.sector = sector
        self.instrumentCurrency = instrumentCurrency
        self.isTradeable = isTradeable
        self.notes = notes

    def to_map_as_date_string(self):
        return {
            "instrumentId": self.instrumentId,
            "instrumentName": self.instrumentName,
            "instrumentType": self.instrumentType,
            "country": self.country,
            "sector": self.sector,
            "instrumentCurrency": self.instrumentCurrency,
            "isTradeable": self.isTradeable,
            "createdAt": format_datetime(self.createdAt),
            "modifiedAt": format_datetime(self.modifiedAt),
            "notes": self.notes
        }


def create_an_instrument(data_obj):
    data = data_obj["data"]
    data = InstrumentData(data["instrumentName"], data["instrumentType"], data["country"], data["sector"],
                          data["instrumentCurrency"], bool(data["isTradeable"]), data.get("notes", None))
    instruments_db.session.add(data)
    instruments_db.session.commit()
    out = {
        "instrumentId": data.instrumentId,
        "createdAt": data.createdAt.strftime("%Y-%m-%d %H:%M:%S")
    }
    instruments_db.session.remove()
    instruments_db.session.close()
    return out


def retrieve_an_instrument(instrumentId):
    instrument = InstrumentData.query.get(instrumentId)
    data = instrument.to_map_as_date_string() if instrument else "Not Available"
    return {"data": data}


def retrieve_list_of_instruments():
    instrument_list = InstrumentData.query.all()
    instrument_list = [instrument_data.to_map_as_date_string() for instrument_data in instrument_list]
    return {"data": instrument_list}


def update_an_instrument(instrumentId, data_obj):
    instrument = InstrumentData.query.filter_by(instrumentId=instrumentId).first()
    data = data_obj["data"]
    try:
        instrument.instrumentName = data["instrumentName"]
        instrument.country = data["country"]
        instrument.sector = data["sector"]
        instrument.instrumentType = data["instrumentType"]
        instrument.instrumentCurrency = data["instrumentCurrency"]
        instrument.isTradeable = bool(data["isTradeable"])
        instrument.notes = data.get("notes", None)
    except KeyError:
        return "Missing field in request."
    instruments_db.session.commit()
    out = {
        "instrumentId": instrument.instrumentId,
        "createdAt": format_datetime(instrument.createdAt),
        "modifiedAt": format_datetime(instrument.modifiedAt)
    }
    instruments_db.session.remove()
    instruments_db.session.close()
    return out


def delete_an_instrument(instrumentId):
    InstrumentData.query.filter_by(instrumentId=instrumentId).delete()
    instruments_db.session.commit()
    instruments_db.session.remove()
    instruments_db.session.close()
    return "Deleted"


def format_datetime(datetime: datetime):
    return datetime.strftime("%Y-%m-%d %H:%M:%S") if datetime else ""
