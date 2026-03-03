import os
from dotenv import load_dotenv

# Load .env file only if it exists (for local development)
load_dotenv()

class Config:
    # 1. Flask Security
    # In Vercel, this should be a long random string
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY', 'default-dev-key-12345')

    # 2. Firebase Database URL
    # IMPORTANT: Realtime Database needs its own URL variable
    DATABASE_URL = os.environ.get('FIREBASE_DATABASE_URL')

    # 3. Firebase Private Key Cleaning
    # Vercel's UI often adds extra backslashes to \n. This fix is mandatory.
    raw_key = os.environ.get('FIREBASE_PRIVATE_KEY')
    private_key = None
    if raw_key:
        private_key = raw_key.replace('\\n', '\n')

    # 4. Firebase Admin Credentials Dictionary
    FIREBASE_CONFIG = {
        "type": "service_account",
        "project_id": os.environ.get('FIREBASE_PROJECT_ID'),
        "private_key": private_key,
        "client_email": os.environ.get('FIREBASE_CLIENT_EMAIL'),
        "token_uri": "https://oauth2.googleapis.com/token",
    }

    # 5. Debugging Helper (Prints to Vercel Logs, not the browser)
    @staticmethod
    def validate_config():
        missing = []
        if not os.environ.get('FIREBASE_PROJECT_ID'): missing.append("PROJECT_ID")
        if not os.environ.get('FIREBASE_PRIVATE_KEY'): missing.append("PRIVATE_KEY")
        if not os.environ.get('FIREBASE_CLIENT_EMAIL'): missing.append("CLIENT_EMAIL")
        
        if missing:
            print(f"⚠️ CONFIG WARNING: Missing Environment Variables: {', '.join(missing)}")
        else:
            print("✅ CONFIG SUCCESS: All Firebase variables loaded.")
