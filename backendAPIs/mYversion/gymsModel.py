from config import db, ma
from sqlalchemy import Column, String
import json

# this is just the mimic of all the database table no change here


# this create the table if not exist via the command create_all()
class Gyms(db.Model):
    __tablename__ = "GYMS"  # name of the table in sql
    GYM_ID = Column(String(50), primary_key=True)
    GYM_NAME = Column(String(200), index=False, nullable=False)
    AUTH_METHOD = Column(String(200), index=False, nullable=False)
    PASSWD = Column(String(100), index=False, nullable=True)

    def __init__(self, GYM_ID, GYM_NAME, AUTH_METHOD, PASSWD):
        self.GYM_ID = GYM_ID
        self.GYM_NAME = GYM_NAME
        self.AUTH_METHOD = AUTH_METHOD
        self.PASSWD = PASSWD


#this doesnot create model but access the data from the sql
#  Gyms = Table(
#     'GYMS', meta,
#     Column('GYM_ID', String, primary_key = True),
#     Column('GYM_NAME', String),
#     Column('AUTH_METHOD', String),
#     Column('PASSWD', String),


class GymsSchema(ma.ModelSchema):
    class Meta:
        # Fields to expose
        fields = ('GYM_ID', 'GYM_NAME', 'AUTH_METHOD', 'PASSWD')