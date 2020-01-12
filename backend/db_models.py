from backend import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    public_id = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(30), nullable=False)
    surname = db.Column(db.String(30), nullable=False)
    role = db.Column(db.String(30), nullable=False)
    wallet = db.Column(db.Integer, nullable=False)
    points = db.Column(db.Integer, nullable=False)
    nickname = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(200), nullable=False, unique=True)
    
    
    