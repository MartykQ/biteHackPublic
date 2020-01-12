from backend import app
from backend import db
from flask import request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import jwt
import datetime
from functools import wraps
from backend.db_models import User
import random
from flask_cors import cross_origin


def nickinicki():
    adj=["White","Black","Big","Short","Pretty","Orange","Yellow","Coldblooded","Angry","Mildly-interesting",
        "Confusing","Creative","Absent-minded","Interesting","Helpful","Green","Nice","Kind","Mean","Average"]
    nouns=["Beetroot","Baby","Caramel","Dog","Cat","Wolverine","Yeti","Wolf","Peanut","Human",
            "Cowboy","Cowgirl","Cow","Staircase","Car","Astronaut","Cook","Chicken","Popcorn","Planet"]
    nick=random.choice(adj) + ' ' + random.choice(nouns)
    return nick
    
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

@app.route('/user', methods=['POST'])
@cross_origin()
def create_user():
    data = request.get_json()

    hashed_password = generate_password_hash(data['password'], method='sha256')
    
    new_user = User(public_id=str(uuid.uuid4()), name=data['name'],
                    surname=data['surname'], role=data['role'], wallet=100,
                    points = 10, nickname=nickinicki(), password=hashed_password,
                    email = data["email"])

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'user was added'})

@app.route('/user', methods=['DELETE'])
@token_required
def delete_user(current_user):
    data = request.get_json()
    user=User.query.filter_by(public_id=data.get('public_id')).first()

    if not user:
        return jsonify({'message':'No user found!'}) 
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({'message' : 'The user has been deleted!'})



@app.route('/user_info', methods=['GET'])
@token_required
def get_current_info(current_user):
    alls = User.query.all()
    counter=0
    output = []

    for user in alls:

        user_data = {}
        user_data ['name'] = user.name 
        user_data ['surname'] = user.surname
        user_data['points'] = user.points
        user_data['public_id']= user.public_id
        output.append(user_data)
      
    sorted_output = sorted(output, key=lambda i: (i['points'], i['surname'], i['name']), reverse=True)

    for user in sorted_output:
        counter += 1
        if current_user.public_id == user['public_id']:
            break

            
    return jsonify({
        "name":current_user.name,
         "surname":current_user.surname,
         "role":current_user.role,
          "nickname":current_user.nickname,
           "wallet":current_user.wallet,
            "points":current_user.points,
             "placement":counter})



@app.route('/donate', methods=['POST'])
@token_required
def donate(current_user):
    data = request.get_json()
    if current_user.wallet<=0:
        return jsonify({'message' : 'You have no more Supps to donate'})
    else:
        kwota = data["kwota"]
        if kwota>current_user.wallet:
            return jsonify({'message' : 'You cannot give more than you have'})
        else:
            found_user = User.query.filter_by(public_id=data.get('public_id')).first()
            if found_user.public_id==current_user.public_id:
                return jsonify({'message' : 'U cannot donate to yourself!'})
            else:
                found_user.points+=kwota
                current_user.wallet-= kwota


                db.session.commit()
                return jsonify({'message' : f'You donated {kwota} points'})

@app.route('/leaderboards', methods=['GET'])
@token_required
def get_leaderboards(current_user):

    leaderboards = User.query.all()

    output = []

    for user in leaderboards:

        user_data = {}
        user_data ['nickname'] = user.nickname
        user_data ['points'] = user.points
        user_data ['name'] = user.name
        user_data ['surname'] = user.surname

        output.append(user_data)
    
        
    sorted_output = sorted(output, key=lambda i: (i['points'], i['surname'], i['name']), reverse=True)
    
    cleared_sorted_output=[]

    for i in sorted_output:
       temp = i
       if "points" in temp:
            del temp["points"]
            del temp["surname"]
            del temp["name"]
            cleared_sorted_output.append(temp)

    return jsonify(cleared_sorted_output)


@app.route('/final_leaderboards', methods=['GET'])
@token_required
def get_final_leaderboards(current_user):

    if current_user.role != 'Admin':
        return jsonify({'message' : 'Access denied'})

    else:
        leaderboards = User.query.all()

        output = []

        for user in leaderboards:

            user_data = {}
            user_data ['name'] = user.name
            user_data ['surname'] = user.surname
            user_data['points'] = user.points
            user_data['nickname']=user.nickname

            output.append(user_data)
        
            
        sorted_output = sorted(output, key=lambda i: (i['points'], i['surname'], i['name']), reverse=True)
        

        return jsonify(sorted_output)

@app.route('/login')
def login():
    auth = request.authorization
    
    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required"'})
    
    user = User.query.filter_by(email=auth.username).first()
    
    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required"'})

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=600)}, app.config['SECRET_KEY'])
        
        return jsonify({'token' : token.decode('UTF-8')})

    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required'})


@app.route('/all_user', methods=["GET"])
@token_required
def get_all_users(current_user):

    all_users = User.query.all()

    output = [] 

    for user in all_users:
        user_data = {}
        user_data['public_id'] = user.public_id
        user_data['name'] = user.name
        user_data['surname'] = user.surname
        user_data['role'] = user.role
        user_data['wallet'] = user.wallet
        user_data['points'] = user.points
        output.append(user_data)

    return jsonify({'users' : output})


@app.route('/reset_wallet', methods =['POST'])
@token_required
def reset_wallet(current_user):
    
    if current_user.role != 'Admin':
        return jsonify({'message' : 'Access denied'})
    
    else:   
        all_users = User.query.all()

        for user in all_users:
            user.wallet = 100
    
        db.session.commit()
        return jsonify({'message' : 'Wallets have been reset!'})
        
    


@app.route('/reset_points', methods =['POST'])
@token_required
def reset_points(current_user):
    
    if current_user.role != 'Admin':
        return jsonify({'message' : 'Access denied'})
    
    else:   
        all_users = User.query.all()

        for user in all_users:
            user.points = 0
    
        db.session.commit()
        return jsonify({'message' : 'Points have been reset!'})

@app.route('/add_hack', methods=['POST'])
def add_hack():
    teams=["Shadows On The Wall",
	"Lorem Ipsum", 
	"Vortex", 
	"Hack Me Hard", 
	"Unix Masters", 
	"Random Dudes", 
	"Mianowicie Proszę Państwa", 
	"Solvinden", 
	"Zosia to Misio", 
	"Biometr", 
	"E-lemon-ated", 
	"DD Crew", 
	"code.overdose()", 
	"Champions", 
	"GVEPS", 
	"Trapware", 
	"Zyzuś Tłuścioch XD", 
	"Great Success Squad",  
	"FRONT",
	"kopacze",
	"Best",
	"Anonimowi Informatycy",
	"Dzikie Pythony",
	"CodeVillains",
	"Truncated Cone",
	"Binarne Kabanosy",
	"112358",
	"justCheckingHow"]

    for user in teams:
        hashed_password = generate_password_hash(user, method='sha256')
        new_user = User(public_id=str(uuid.uuid4()), name=user,
                    surname=user, role="tester", wallet=100,
                    points = 10, nickname=nickinicki(), password=hashed_password,
                    email = user)

        db.session.add(new_user)
        db.session.commit()
    return jsonify({'message': 'users were added'})












