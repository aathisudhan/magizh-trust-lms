from flask import Blueprint, jsonify, session, request
from firebase_admin import db

lms_bp = Blueprint('lms', __name__)

@lms_bp.route('/api/materials', methods=['GET'])
def get_materials():
    # Security: Only logged-in users can see materials
    if not session.get('user'):
        return jsonify({"error": "Unauthorized"}), 401
        
    materials = db.reference('materials').get()
    return jsonify(materials if materials else {})

@lms_bp.route('/api/assignments/submit', methods=['POST'])
def submit_assignment():
    user = session.get('user')
    if user and user['role'] == 'student':
        try:
            uid = user['uid']
            submission_data = request.json
            # Add timestamp for sorting
            submission_data['timestamp'] = {".sv": "timestamp"} 
            
            db.reference(f'submissions/{uid}').push(submission_data)
            return jsonify({"status": "submitted"})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
            
    return jsonify({"error": "Forbidden"}), 403
