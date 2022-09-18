from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

from utils import format_datetime

db = SQLAlchemy()


class InstrumentData(db.Model):
    __tablename__: str = "instrument_table"
    __table_args__ = {"tend_existing": True}

    instrumentId = db.Column(db.Integer, db.Identity(start=201, cycle=True), primary_key=True)
    instrumentName = db.Column(db.String, nullable=False)
    instrumentType = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    sector = db.Column(db.String, nullable=False)
    instrumentCurrency = db.Column(db.String, nullable=False)
    isTradeable = db.Column(db.Boolean, nullable=False)
    isDeleted = db.Column(db.Boolean, default=False)
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
            "isDeleted": self.isDeleted,
            "createdAt": format_datetime(self.createdAt),
            "modifiedAt": format_datetime(self.modifiedAt),
            "notes": self.notes
        }


class MarketValueData(db.Model):
    __tablename__: str = "market_value_table"
    __table_args__ = {"tend_existing": True}

    marketValueId = db.Column(db.Integer, db.Identity(start=6031, cycle=True), primary_key=True)
    instrumentId = db.Column(db.Integer, db.ForeignKey('instrument_table.instrumentId'), nullable=False)
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


class TransactionData(db.Model):
    __tablename__: str = "transaction_table"
    __table_args__ = {"tend_existing": True}

    transactionId = db.Column(db.Integer, db.Identity(start=4954, cycle=True), primary_key=True)
    instrumentId = db.Column(db.Integer, db.ForeignKey('instrument_table.instrumentId'), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    transactionDate = db.Column(db.DateTime, nullable=False)
    transactionAmount = db.Column(db.Float, nullable=False)
    transactionType = db.Column(db.String, nullable=False)
    transactionCurrency = db.Column(db.String, nullable=False)
    isCancelled = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())
    modifiedAt = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __init__(self, instrumentId, quantity, transactionDate, transactionAmount,
                 transactionType, transactionCurrency):
        self.instrumentId = instrumentId
        self.quantity = quantity
        self.transactionDate = transactionDate
        self.transactionAmount = transactionAmount
        self.transactionType = transactionType
        self.transactionCurrency = transactionCurrency

    def to_map_as_date_string(self):
        return {
            "transactionId": self.transactionId,
            "instrumentId": self.instrumentId,
            "quantity": self.quantity,
            "transactionDate": format_datetime(self.transactionDate),
            "transactionType": self.transactionType,
            "transactionAmount": self.transactionAmount,
            "transactionCurrency": self.transactionCurrency,
            "isCancelled": self.isCancelled,
            "createdAt": format_datetime(self.createdAt),
            "modifiedAt": format_datetime(self.modifiedAt),
        }
