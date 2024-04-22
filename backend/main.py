from flask import Flask, request, jsonify, Response, redirect, session
from flask_session import Session

import joblib
from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
import bcrypt
import string
import secrets
import os

app = Flask(__name__)

# MySQL configurations
MYSQL_HOST = 'localhost'  # XAMPP default host
MYSQL_USER = 'root'  # MySQL username
MYSQL_PASSWORD = ''  # MySQL password
MYSQL_DB = 'liquefaction'  # MySQL database name
MYSQL_PORT = 3306  # MySQL port

# SQLAlchemy engine
engine = create_engine(f'mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}')

# Initialize cross origin for flask and react communication
cors = CORS(app, origins='*')

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Load soil liquefaction random forest model
model = joblib.load("soil_liquefaction_rf.joblib")
scaler = joblib.load("scaler.joblib")



#============================================================================
#============================================================================
# FUNCTION TO FETCH BARANGAY RANDOM FOREST SOIL LIQUEFACTION
#============================================================================
#============================================================================

# @app.route("/evaluate", methods=["POST"])
# def evaluate():
#     # Retrieve data from the request
#     data = request.json
    
#     # Extract features from the received data
#     pi = data.get("pi")
#     n = data.get("n")
#     moisture = data.get("moisture")
#     d50 = data.get("d50")
#     fc = data.get("fc")
#     gwl = data.get("gwl")
    
#     # Scale the features
#     scaled_features = scaler.transform([[pi, n, moisture, d50, fc, gwl]])
    
#     # Perform soil liquefaction using the loaded model
#     prediction = model.predict(scaled_features)
    
#     if prediction == 0:
#         result = "No"
#     elif prediction == 1:
#         result = "Yes"
    
#     # Return the result as JSON
#     return jsonify({"result": "" + result})

@app.route("/evaluate", methods=["POST"])
def evaluate():
    # Retrieve data from the request
    data = request.json
    
    # Extract features from the received data
    pi = data.get("pi")
    n = data.get("n")
    moisture = data.get("moisture")
    d50 = data.get("d50")
    fc = data.get("fc")
    gwl = data.get("gwl")
    
    # Perform soil liquefaction using the loaded model
    prediction = model.predict([[pi, n, moisture, d50, fc, gwl]])
    
    if prediction == 0:
        result = "No"
    elif prediction == 1:
        result = "Yes"
    
    # Return the result as JSON
    return jsonify({"result": "" + result})




#============================================================================
#============================================================================
# FUNCTION TO FETCH BARANGAY LIST FROM MYSQL DATABASE
#============================================================================
#============================================================================

@app.route("/barangay/fetch", methods=["GET"])
def getBarangays():
    with engine.connect() as connection:
        result = connection.execute('SELECT * FROM barangays')
        # Convert datetime objects to strings
        data = [{'id': row[0], 'name': row[1], 'evaluation': row[2], 'status': row[3], 'datetime': row[4].strftime('%Y-%m-%d %H:%M:%S'), 'someField': row[5]} for row in result]
    return jsonify(data)




#============================================================================
#============================================================================
# FUNCTION TO EVALUATE BARANGAY SOIL LIQUEFACTION IN DATABASE
#============================================================================
#============================================================================

@app.route("/barangay/update/<int:id>", methods=["PUT"])
def update_liquefaction(id):
    try:
        # Get liquefaction result from request
        liquefaction = request.json.get('liquefaction')

        # Update liquefaction column in the database
        with engine.connect() as connection:
            connection.execute(f"UPDATE barangays SET liquefaction = {liquefaction} WHERE id = {id}")

        return jsonify({"message": "Liquefaction column updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500




#============================================================================
#============================================================================
# FUNCTION TO ADD A NEW BARANGAY TO DATABASE
#============================================================================
#============================================================================
@app.route("/barangay/add", methods=["POST"])
def add_barangay():
    try:
        # Retrieve data from the request
        data = request.json
        
        # Extract name from the received data
        name = data.get("name")

        # Validate input
        if not name:
            return jsonify({"error": "Name field is required"}), 400

        # Insert new barangay into the database
        with engine.connect() as connection:
            connection.execute("INSERT INTO barangays (name, liquefaction) VALUES (%s, %s)", (name, "Pending"))

        return jsonify({"message": "Barangay added successfully"}), 201
    except IntegrityError:
        return jsonify({"error": "Barangay with this name already exists"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500





#============================================================================
#============================================================================
# FUNCTION TO  DELETE BARANGAY IN DATABASE
#============================================================================
#============================================================================
@app.route("/barangay/delete/<int:id>", methods=["DELETE"])
def delete_barangay(id):
    try:
        # Delete the barangay from the database
        with engine.connect() as connection:
            connection.execute(f"DELETE FROM barangays WHERE id = {id}")
        
        return jsonify({"message": "Barangay deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500





#============================================================================
#============================================================================
# FUNCTION TO FETCH ADMINISTRATOR LIST FROM DATABASE
#============================================================================
#============================================================================

@app.route("/administrator/fetch", methods=["GET"])
def getAdministrators():
    if not session.get("name"):
        jsonify("Not Login")
    with engine.connect() as connection:
        result = connection.execute("SELECT * FROM users WHERE user_id != 'admin'")
        data = [{'id': row[0], 'user_id': row[1], 'firstname': row[2], 'middlename': row[3], 'surname': row[4], 'photo': row[5], 'status': row[7], 'created_at': row[8].strftime('%Y-%m-%d %H:%M:%S')} for row in result]
    return jsonify(data)




#============================================================================
#============================================================================
# FUNCTION TO ADD A NEW ADMINISTRATOR TO DATABASE
#============================================================================
#============================================================================
@app.route("/administrator/add", methods=["POST"])
def add_administrator():
    try:
        # Retrieve data from the form
        user_id = "subadmin"  # Assuming user_id is fixed as "admin"
        photo = request.files["photo"]  # Accessing the file from the form data
        firstname = request.form.get("firstname")
        middlename = request.form.get("middlename")
        surname = request.form.get("surname")
        password = "subadmin"  # Assuming password is fixed

        file_extension = os.path.splitext(photo.filename)[1].lower()
        random_filename = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(10))
        filename = random_filename + file_extension

        password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        # Validate input
        if not firstname:
            return jsonify({"error": "First name field is required"}), 400
        if not surname:
            return jsonify({"error": "Surname field is required"}), 400
        if not middlename:
            return jsonify({"error": "Middlename field is required"}), 400
        if not user_id:
            return jsonify({"error": "User ID field is required"}), 400
        if not password:
            return jsonify({"error": "User Password field is required"}), 400
        
        # Insert new administrator into the database
        with engine.connect() as connection:
            connection.execute("INSERT INTO users (user_id, firstname, middlename, surname, password, photo) VALUES (%s, %s, %s, %s, %s, %s)", 
                               (user_id, firstname, middlename, surname, password, filename))  
        
        
        photo.save("C:\\xampp\\htdocs\\SoilLiquefaction\\frontend\\src\\assets\\images\\" + filename)
        
        return jsonify({"message": "Administrator added successfully"}), 201
    except IntegrityError:
        return jsonify({"error": "Administrator with this name already exists"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500







#============================================================================
#============================================================================
# FUNCTION TO  DELETE ADMINISTRATOR IN DATABASE
#============================================================================
#============================================================================
@app.route("/administrator/delete/<int:id>", methods=["DELETE"])
def delete_administrator(id):
    try:
        # Delete the barangay from the database
        with engine.connect() as connection:
            connection.execute(f"DELETE FROM users WHERE id = {id}")
        
        return jsonify({"message": "Adminstrator deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



#============================================================================
#============================================================================
# FUNCTION FOR USER LOGIN
#============================================================================
#============================================================================

@app.route("/admin/login", methods=["POST"])
def login():
    try:
        # Retrieve data from the request
        data = request.json
        
        # Extract username and password from the received data
        user_id = data.get("user_id")
        password = data.get("password")

        # Fetch user data from the database based on the provided username
        with engine.connect() as connection:
            result = connection.execute(f"SELECT * FROM users WHERE user_id = '{user_id}'")
            user = result.fetchone()

        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            # Convert user object to a dictionary
            user_dict = dict(user)
            # Remove the password field from the dictionary before returning
            user_dict.pop('password')

            session["user_id"] = request.form.get("user_id")
            return jsonify({"message": "Login successful", "user": user_dict}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
