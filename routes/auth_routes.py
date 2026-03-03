from flask import Blueprint, request, jsonify, session
from firebase_admin import auth, db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    id_token = request.json.get('idToken')
    try:
        # Verify the Firebase ID Token
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        
        # Get user role from Realtime Database
        user_data = db.reference(f'users/{uid}').get()
        role = user_data.get('role', 'student') if user_data else 'student'
        
        # Set Server-Side Session for RBAC
        session['user'] = {
            'uid': uid, 
            'role': role, 
            'email': decoded_token['email']
        }
        
        return jsonify({"status": "success", "role": role})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 401

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    try:
        id_token = data.get('idToken')
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        
        # Create profile in Database
        db.reference(f'users/{uid}').set({
            'username': data.get('username'),
            'role': data.get('role', 'student'),
            'email': decoded_token['email']
        })
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400
