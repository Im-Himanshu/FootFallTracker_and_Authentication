from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
engine = create_engine(
    "mysql://root:admin#123@localhost:3308/footfalltrackerboot", echo=True)
meta = MetaData()

students = Table(
    'students',
    meta,
    Column('id', Integer, primary_key=True),
    Column('name', String(100)),
    Column('lastname', String(100)),
)

#meta.create_all(engine) this function create the table if it doesnot exist in database

s = students.select().where(students.c.id >= 2)
conn = engine.connect()
result = conn.execute(s)

for row in result:
    print(row)
