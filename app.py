import os
from flask import Flask, session, redirect, url_for, render_template
import firebase_admin
from firebase_admin import credentials

# Import Config and Blueprints
from config import Config
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.lms_routes import lms_bp

app = Flask(__name__)
app.config.from_object(Config)

# ---------------------------------------------------------
# Firebase Initialization (Singleton Pattern)
# ---------------------------------------------------------
if not firebase_admin._apps:
    try:
        # Pull the dictionary created in config.py
        firebase_dict = app.config.get('FIREBASE_CONFIG')
        
        if firebase_dict and firebase_dict.get("private_key"):
            cred = credentials.Certificate(firebase_dict)
            firebase_admin.initialize_app(cred, {
                'databaseURL': app.config.get('DATABASE_URL')
            })
            print("✅ Firebase Admin SDK Initialized successfully.")
        else:
            print("⚠️ Firebase credentials missing or private_key is empty.")
    except Exception as e:
        print(f"❌ Critical Error initializing Firebase: {e}")

# ---------------------------------------------------------
# Register Blueprints
# ---------------------------------------------------------
app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(lms_bp)

# ---------------------------------------------------------
# Global Routes
# ---------------------------------------------------------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/health')
def health():
    return {"status": "online", "firebase": len(firebase_admin._apps) > 0}, 200

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

# Error handler for cleaner navigation
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404

# Required for Vercel Python Runtime
app = app

if __name__ == '__main__':
    app.run(debug=True)
