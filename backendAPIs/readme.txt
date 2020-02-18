python server.py



created a new virtual environment in conda : 
conda activate backend


install all the library manually till the error is resolved 

and finally run this also
AttributeError: 'Marshmallow' object has no attribute 'ModelSchema' :
pip install marshmallow-sqlalchemy

setup the sqllite, setup the system path it should work fine in everycase, some complexity given here 
: https://www.tutorialspoint.com/sqlite/sqlite_installation.htm

ctrl+shift+p to execute sqlite command


for setting the path to new conda environment use this 
@ext:ms-python.python Venv and give the conda path to the virtual environment
generally 
C:\ProgramData\Anaconda3\envs like this 


all the error will go if the path is correctly  resolved in the default interpretter
: https://docs.anaconda.com/anaconda/user-guide/tasks/integration/python-path/
https://code.visualstudio.com/docs/python/environments


for learning querying on sqlalchemy https://towardsdatascience.com/sqlalchemy-python-tutorial-79a577141a91


mysql://root:915273/@admin@localhost:3308/footfalltrackerboot
dialect+driver://user:pass@host:port/db
mysql://sql12323255:c61Gu8jKBL@sql12.freemysqlhosting.net:3306/sql12323255
mysql://username:password@server/db

db.create_all()