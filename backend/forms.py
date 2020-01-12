from flask_wtf import FlaskForm





class UpdateAccountForm(FlaskForm):
    picture = FileField('Update Profile Picture'), validators=[FileAllowed(['jpg','png'])])

