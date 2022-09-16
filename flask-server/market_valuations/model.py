import sqlalchemy as sa
from sqlalchemy.engine.url import URL
from sqlalchemy import orm as sa_orm

from sqlalchemy_redshift.dialect import TIMESTAMPTZ

# build the sqlalchemy URL
url = URL.create(
    drivername='redshift+redshift_connector',  # indicate redshift_connector driver and dialect will be used
    host='<clusterid>.xxxxxx.<aws-region>.redshift.amazonaws.com',  # Amazon Redshift host
    port=5439,  # Amazon Redshift port
    database='dev',  # Amazon Redshift database
    username='awsuser',  # Amazon Redshift username
    password='<pwd>'  # Amazon Redshift password
)

engine = sa.create_engine(url)

Session = sa_orm.sessionmaker()
Session.configure(bind=engine)
session = Session()

# Define Session-based Metadata
metadata = sa.MetaData(bind=session.bind)

# Define Table
table_name = 'market_valuations'

MarketValuationDBTable = sa.Table(
    table_name,
    metadata,
    sa.Column('datetime', TIMESTAMPTZ),
    sa.Column('value', sa.FLOAT),
    sa.Column('quantity', sa.FLOAT),
    redshift_diststyle='KEY',
    redshift_distkey='datetime',
    redshift_sortkey='datetime'
)

# Drop the table if it already exists
if sa.inspect(engine).has_table(table_name):
    MarketValuationDBTable.drop(bind=engine)

MarketValuationDBTable.create(bind=engine)
