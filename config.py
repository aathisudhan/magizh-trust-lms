import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask Security
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY', 'dev-key-placeholder')
    
    # Firebase Admin Credentials (Securely pulled from Vercel Env)
    FIREBASE_CONFIG = {
        "project_id": os.environ.get('FIREBASE_PROJECT_ID'),
        "private_key": os.environ.get('FIREBASE_PRIVATE_KEY').replace('\\n', '\n') if os.environ.get('FIREBASE_PRIVATE_KEY') else None,
        "client_email": os.environ.get('FIREBASE_CLIENT_EMAIL'),
    }
