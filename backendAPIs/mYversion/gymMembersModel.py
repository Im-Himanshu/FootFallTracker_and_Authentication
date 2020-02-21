from config import db, ma
from sqlalchemy import Column, String, ForeignKey, JSON, INTEGER

# CREATE TABLE GYM_MEMBERS
# (
# 	MEMBER_ID VARCHAR(50) NOT NULL PRIMARY KEY,
# 	MEMBER_NAME VARCHAR(200) NOT NULL,
# 	GYM_ID VARCHAR(50) NOT NULL,
# 	ENCODINGS JSON,
# 	FOREIGN KEY (GYM_ID) REFERENCES GYMS(GYM_ID),
# );
# this is just the mimic of all the database table no change here


# this create the table if not exist via the command create_all()
class GymMember(db.Model):
    __tablename__ = "GYM_MEMBERS"  # name of the table in sql
    MEMBER_ID = Column(INTEGER,
                       primary_key=True,
                       nullable=False,
                       autoincrement=True)  ## will get feeded accordingly
    MEMBER_NAME = Column(String(200))
    GYM_ID = Column(String(50),
                    ForeignKey("GYMS.GYM_ID"),
                    index=False,
                    nullable=False)
    ENCODINGS = Column(JSON, index=False, nullable=True)

    # how to work with it ? -- https://medium.com/aubergine-solutions/working-with-mysql-json-data-type-with-prepared-statements-using-it-in-go-and-resolving-the-15ef14974c48

    def __init__(self, MEMBER_NAME, GYM_ID, ENCODINGS):
        #self.MEMBER_ID = MEMBER_ID
        self.MEMBER_NAME = MEMBER_NAME
        self.GYM_ID = GYM_ID
        self.ENCODINGS = ENCODINGS


#this doesnot create model but access the data from the sql
#  Gyms = Table(
#     'GYMS', meta,
#     Column('GYM_ID', String, primary_key = True),
#     Column('GYM_NAME', String),
#     Column('AUTH_METHOD', String),
#     Column('PASSWD', String),


class GymMemberSchema(ma.ModelSchema):
    class Meta:
        # Fields to expose
        fields = ('MEMBER_ID', 'MEMBER_NAME', 'GYM_ID', 'ENCODINGS')
