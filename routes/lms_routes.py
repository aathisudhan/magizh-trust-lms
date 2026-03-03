from flask import Blueprint, jsonify, session
from firebase_admin import db

lms_bp = Blueprint('lms', __name__)

@lms_bp.route('/api/materials', methods=['GET'])
def get_materials():
    # Only logged-in users can see materials
    if not session.get('user'):
        return jsonify({"error": "Unauthorized"}), 401
        
    materials = db.reference('materials').get()
    return jsonify(materials if materials else {})

@lms_bp.route('/api/assignments/submit', methods=['POST'])
def submit_assignment():
    if session.get('user') and session['user']['role'] == 'student':
        # Logic to record submission in Firebase
        uid = session['user']['uid']
        submission_data = request.json
        db.reference(f'submissions/{uid}').push(submission_data)
        return jsonify({"status": "submitted"})
    return jsonify({"error": "Forbidden"}), 403
