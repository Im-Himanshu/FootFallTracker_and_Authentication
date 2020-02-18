from config import db, ma
from sqlalchemy import Column, String, ForeignKey, Float, TIMESTAMP, UniqueConstraint
import json

# this is just the mimic of all the database table no change here


# FOOTFALL_ID VARCHAR(50) NOT NULL PRIMARY KEY,
# MEMBER_ID VARCHAR(50) NOT NULL ,
# GYM_ID VARCHAR(50) NOT NULL,
# FOOTFALL_TIMESTAMP TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
# ENTRY_EXIT VARCHAR(10),
# X_COORD_FRAC FLOAT,
# Y_COORD_FRAC FLOAT,
# UNIQUE (MEMBER_ID, GYM_ID,FOOTFALL_TIMESTAMP),
# FOREIGN KEY (MEMBER_ID) REFERENCES GYM_MEMBERS(MEMBER_ID),
# FOREIGN KEY (GYM_ID) REFERENCES GYMS(GYM_ID)
# this create the table if not exist via the command create_all()
class FootFall(db.Model):
    __tablename__ = "FOOTFALL"  # name of the table in sql
    FOOTFALL_ID = Column(String(50), primary_key=True)
    MEMBER_ID = Column(String(50),
                       ForeignKey("GYM_MEMBERS.MEMBER_ID"),
                       nullable=False)
    GYM_ID = Column(String(50), ForeignKey("GYMS.GYM_ID"), nullable=False)
    FOOTFALL_TIMESTAMP = Column(TIMESTAMP, nullable=False)
    ENTRY_EXIT = Column(String(10), nullable=False)
    X_COORD_FRAC = Column(Float, nullable=True)
    Y_COORD_FRAC = Column(Float, nullable=True)
    UniqueConstraint('MEMBER_ID',
                     'GYM_ID',
                     'FOOTFALL_TIMESTAMP',
                     name='uniqueUserActivityConstrain')

    def __init__(self, FOOTFALL_ID, MEMBER_ID, GYM_ID, FOOTFALL_TIMESTAMP,
                 ENTRY_EXIT, X_COORD_FRAC, Y_COORD_FRAC):
        self.FOOTFALL_ID = FOOTFALL_ID
        self.MEMBER_ID = MEMBER_ID
        self.GYM_ID = GYM_ID
        self.FOOTFALL_TIMESTAMP = FOOTFALL_TIMESTAMP
        self.ENTRY_EXIT = ENTRY_EXIT
        self.X_COORD_FRAC = X_COORD_FRAC
        self.Y_COORD_FRAC = Y_COORD_FRAC


#this doesnot create model but access the data from the sql
#  Gyms = Table(
#     'GYMS', meta,
#     Column('GYM_ID', String, primary_key = True),
#     Column('GYM_NAME', String),
#     Column('AUTH_METHOD', String),
#     Column('PASSWD', String),


class FootFallSchema(ma.ModelSchema):
    class Meta:
        # Fields to expose
        fields = ('FOOTFALL_ID', 'MEMBER_ID', 'GYM_ID', 'FOOTFALL_TIMESTAMP',
                  'ENTRY_EXIT', 'X_COORD_FRAC', 'Y_COORD_FRAC')
