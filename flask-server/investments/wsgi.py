from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from config import Config
from controller import rds_blueprint


rds_app = Flask(__name__)
rds_app.config.from_object(Config)
rds_app.register_blueprint(rds_blueprint)
rds_db = SQLAlchemy(rds_app)


@rds_app.cli.command("reset_db")
def reset_db():
    rds_db.drop_all()
    rds_db.create_all()
    rds_db.session.commit()
    print("DB has been reset")


@rds_app.cli.command("create_db")
def create_db():
    rds_db.create_all()
    rds_db.session.commit()
    print("DB is created")


if __name__ == '__main__':
    rds_app.run(host='0.0.0.0', port=5004, debug=False)
