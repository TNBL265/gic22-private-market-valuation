from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

rds_db = SQLAlchemy()


class InvestmentData(rds_db.Model):
    __tablename__: str = "investment_data"
    __table_args__ = {'extend_existing': True}

    id = rds_db.Column(rds_db.Integer, primary_key=True, autoincrement=True)
    date = rds_db.Column(rds_db.DateTime, nullable=False)
    value = rds_db.Column(rds_db.Float, nullable=False)
    quantity = rds_db.Column(rds_db.Float, nullable=False)

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


def insert_one_investment_data(data_obj):
    data = data_obj['data']
    data = InvestmentData(datetime.strptime(data['date'], '%Y-%m-%d %H:%M:%S'), data['value'], data['quantity'])
    rds_db.session.add(data)
    rds_db.session.commit()
    rds_db.session.remove()
    rds_db.session.close()


def get_investment_data(date: datetime):
    object_list = InvestmentData.query.filter(InvestmentData.date == date).all()
    data_list = [investment_data.to_map_as_date_string() for investment_data in object_list]

    data_map = {"data": data_list}
    return data_map
