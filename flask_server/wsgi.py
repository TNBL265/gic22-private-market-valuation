from flask import Flask

from config import Config
from database import db
from instruments.controller import instruments_blueprint
from market_values.controller import market_values_blueprint
from transactions.controller import transactions_blueprint
from investments.controller import investments_blueprint
from analytics.controller import analytics_blueprint


app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(instruments_blueprint)
app.register_blueprint(market_values_blueprint)
app.register_blueprint(transactions_blueprint)
app.register_blueprint(investments_blueprint)
app.register_blueprint(analytics_blueprint)
db.init_app(app)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=False)