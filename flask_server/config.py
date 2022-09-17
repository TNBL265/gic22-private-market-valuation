import os
basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))


class Config(object):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'gic.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
