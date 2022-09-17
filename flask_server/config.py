import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'gic.db')
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@instruments.ci9wmznzy2lq.ap-southeast-1.rds.amazonaws.com:5432/postgres'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
