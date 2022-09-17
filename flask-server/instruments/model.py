from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

instruments_db = SQLAlchemy()


class InstrumentData(instruments_db.Model):
    __tablename__: str = "instrument_data"
    __table_args__ = {'extend_existing': True}

    id = instruments_db.Column(instruments_db.Integer, primary_key=True, autoincrement=True)
    date = instruments_db.Column(instruments_db.DateTime, nullable=False)
    value = instruments_db.Column(instruments_db.Float, nullable=False)
    quantity = instruments_db.Column(instruments_db.Float, nullable=False)

    def __init__(self, date, value, quantity):
        self.date = date
        self.value = value
        self.quantity = quantity

    def to_map_as_date_string(self):
        return {
            "date": self.date.strftime('%Y-%m-%d %H:%M:%S'),
            "value": self.value,
            "quantity": self.quantity
        }


def insert_one_instrument_data(data_obj):
    data = data_obj['data']
    data = InstrumentData(datetime.strptime(data['date'], '%Y-%m-%d %H:%M:%S'), data['value'], data['quantity'])
    instruments_db.session.add(data)
    instruments_db.session.commit()
    instruments_db.session.remove()
    instruments_db.session.close()


def get_instrument_data(date: datetime):
    object_list = InstrumentData.query.filter(InstrumentData.date == date).all()
    data_list = [instrument_data.to_map_as_date_string() for instrument_data in object_list]

    data_map = {"data": data_list}
    return data_map
