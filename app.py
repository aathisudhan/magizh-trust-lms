from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import firebase_admin
from firebase_admin import credentials, auth, db
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Initialize Firebase Admin SDK
cred = credentials.Certificate(app.config['FIREBASE_CONFIG'])
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://your-project-default-rtdb.firebaseio.com/'
})

# --- ROUTES ---

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Verify Firebase ID Token sent from frontend
        id_token = request.json.get('idToken')
        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
            
            # Fetch User Role from Realtime Database
            user_ref = db.reference(f'users/{uid}').get()
            session['user'] = {'uid': uid, 'role': user_ref.get('role', 'student')}
            
            return jsonify({"status": "success", "role": session['user']['role']})
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 401
    return render_template('login.html')

@app.route('/admin')
def admin_dashboard():
    # Role-Based Access Control (RBAC)
    if session.get('user') and session['user']['role'] == 'admin':
        return render_template('admin.html')
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
