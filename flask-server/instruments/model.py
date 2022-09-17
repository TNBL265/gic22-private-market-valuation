from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

instruments_db = SQLAlchemy()


class InstrumentData(instruments_db.Model):
    __tablename__: str = "instrument_data"
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

    def __init__(self, instrumentName, instrumentType, country, sector, instrumentCurrency, isTradeable, notes):
        self.instrumentName = instrumentName
        self.instrumentType = instrumentType
        self.country = country
        self.sector = sector
        self.instrumentCurrency = instrumentCurrency
        self.isTradeable = isTradeable
        self.notes = notes

    def to_map_as_date_string(self):
        modifiedAt = self.modifiedAt.strftime("%Y-%m-%d %H:%M:%S") if self.modifiedAt else ""
        return {
            "instrumentId": self.instrumentId,
            "instrumentName": self.instrumentName,
            "instrumentType": self.instrumentType,
            "country": self.country,
            "sector": self.sector,
            "instrumentCurrency": self.instrumentCurrency,
            "isTradable": self.isTradeable,
            "createdAt": self.createdAt.strftime("%Y-%m-%d %H:%M:%S"),
            "modifiedAt": modifiedAt,
            "notes": self.notes
        }


def create_an_instrument(data_obj):
    instruments_db.session.expunge_all()
    data = data_obj["data"]
    data = InstrumentData(data["instrumentName"], data["instrumentType"], data["country"], data["sector"],
                          data["instrumentCurrency"], bool(data["isTradable"]), data.get("notes", None))
    instruments_db.session.add(data)
    instruments_db.session.commit()
    output = {
        "instrumentId": data.instrumentId,
        "createdAt": data.createdAt.strftime("%Y-%m-%d %H:%M:%S")
    }
    instruments_db.session.remove()
    instruments_db.session.close()
    return output


def retrieve_list_of_instruments():
    instrument_list = InstrumentData.query.all()
    data_list = [instrument_data.to_map_as_date_string() for instrument_data in instrument_list]
    data_map = {"data": data_list}
    return data_map
