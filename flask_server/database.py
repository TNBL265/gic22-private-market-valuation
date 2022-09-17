from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

from utils import format_datetime

db = SQLAlchemy()


class InstrumentData(db.Model):
    __tablename__: str = "instrument_table"
    __table_args__ = {"tend_existing": True}

    instrumentId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    instrumentName = db.Column(db.String, nullable=False)
    instrumentType = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    sector = db.Column(db.String, nullable=False)
    instrumentCurrency = db.Column(db.String, nullable=False)
    isTradeable = db.Column(db.Boolean, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())
    modifiedAt = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    notes = db.Column(db.String, nullable=True)
    market_value = db.relationship('MarketValueData', lazy='select',
                                               backref=db.backref('instrument', lazy='joined'))

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


class MarketValueData(db.Model):
    __tablename__: str = "market_value_table"
    __table_args__ = {"tend_existing": True}

    marketValueId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    instrumentId = db.Column(db.Integer,
                                           db.ForeignKey('instrument_table.instrumentId'), nullable=False)
    marketValue = db.Column(db.Float, nullable=False)
    marketValueDate = db.Column(db.DateTime, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())
    modifiedAt = db.Column(db.DateTime(timezone=True), onupdate=func.now())

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
