from . import rds_db
from datetime import datetime


class InvestmentData(rds_db.Model):
    __tablename__: str = "share_data"
    __table_args__ = {'extend_existing': True}

    id = rds_db.Column(rds_db.Integer, primary_key=True, autoincrement=True)
    date = rds_db.Column(rds_db.DateTime, nullable=False)
    volume = rds_db.Column(rds_db.Float, nullable=False)
    quantity = rds_db.Column(rds_db.Float, nullable=False)

    def __init__(self, date, volume, quantity):
        self.date = date
        self.volume = volume
        self.quantity = quantity

    def to_map_as_date_string(self):
        return {
            "date": self.date.strftime('%Y-%m-%d %H:%M:%S'),
            "volume": self.volume,
            "quantity": self.quantity
        }


def insert_investment_data(data_obj):
    date: str = data_obj['date']
    investment_data_entries = data_obj['data']

    data_list = [InvestmentData(datetime.strptime(date, '%Y-%m-%d %H:%M:%S'), item['volume'], item['quantity'])
                 for item in investment_data_entries]

    rds_db.session.add_all(data_list)
    rds_db.session.commit()
    rds_db.session.remove()
    rds_db.session.close()
    return len(data_list)


def get_investment_data(date: datetime):
    object_list = InvestmentData.query.filter(InvestmentData.date == date).all()
    data_list = [investment_data.to_map_as_date_string() for investment_data in object_list]

    data_map = {
        "date": date,
        "data": data_list
    }
    return data_map
