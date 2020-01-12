from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS, cross_origin
from flask_avatars import Avatars

app = Flask(__name__)
cors = CORS(app)

db_path = os.path.join(os.path.dirname(__file__), 'site.db')
db_uri = db_uri = 'sqlite:///{}'.format(db_path)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SECRET_KEY'] = '8ee3060c13f6969dc782b782ff318065'
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

db = SQLAlchemy(app)
avatars = Avatars(app)

from backend.routes import routes