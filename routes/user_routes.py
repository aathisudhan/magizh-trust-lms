from flask import Blueprint, render_template, session, redirect, url_for

user_bp = Blueprint('user', __name__)

@user_bp.route('/student')
def student_dashboard():
    if session.get('user') and session['user']['role'] == 'student':
        return render_template('dashboard.html')
    return redirect(url_for('auth.login'))

@user_bp.route('/mentor')
def mentor_panel():
    if session.get('user') and session['user']['role'] == 'mentor':
        return render_template('mentor.html')
    return redirect(url_for('auth.login'))

@user_bp.route('/admin')
def admin_portal():
    if session.get('user') and session['user']['role'] == 'admin':
        return render_template('admin.html')
    return redirect(url_for('auth.login'))
