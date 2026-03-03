from flask import Flask, session, redirect, url_for, render_template
import firebase_admin
from firebase_admin import credentials
import os

# 1. Import your custom config and blueprints
from config import Config
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.lms_routes import lms_bp

app = Flask(__name__)
app.config.from_object(Config)

# 2. Initialize Firebase Admin SDK (Singleton Pattern)
# This prevents re-initialization errors on Vercel's serverless environment
if not firebase_admin._apps:
    cred = credentials.Certificate(app.config['FIREBASE_CONFIG'])
    firebase_admin.initialize_app(cred, {
        'databaseURL': os.environ.get('FIREBASE_DATABASE_URL') 
    })

# 3. Register Blueprints (The "Connection" Logic)
# This tells Flask where to find /login, /admin, /student, etc.
app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(lms_bp)

# 4. Global Routes (Core Pages)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

# 5. Error Handlers (Prevents the ugly Vercel 404 page)
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404

# 6. Vercel Requirement
# We assign app to 'app' so the Vercel Python runtime finds the WSGI callable
app = app

if __name__ == '__main__':
    app.run(debug=True)
