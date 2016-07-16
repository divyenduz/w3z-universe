import datetime

import sendgrid
from config import get_config

config, debug = get_config()

time = datetime.datetime.now().strftime("%b %d %Y %H:%M:%S")

sg = sendgrid.SendGridClient(config['sendgrid_api_key'])

message = sendgrid.Mail()
message.add_to(config['email_for_db_backup'])
message.set_subject('w3z db backup')
message.set_text('This email is auto generated. ' + time)
message.set_from('Divyendu Singh <mail@divyendusingh.com>')
message.add_attachment(time.replace(' ', '_') + '_w3z.db', './w3z.db')

status, msg = sg.send(message)
print(time + ': email sent: status=', status, ' msg=', msg)
