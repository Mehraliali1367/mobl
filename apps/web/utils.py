from kavenegar import *
import threading
from time import perf_counter
import uuid
import os
from django.conf import settings
from django.core.cache import cache


def send_otp(phone_number, code):
    try:
        key = '6B6868427A6E502B3639613163534D697454613775343246516274765069572F6376617736647A63484E413D'
        api = KavenegarAPI(key)
        params = {
            'sender': '',
            'receptor': phone_number,
            'message': f'{code}کد تایید',
        }
        response = api.sms_send(params)
        print(response)

    except APIException as e:
        print(e)
    except HTTPException as e:
        print(e)

    pass

def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    newfilename = "uuid%s.%s" % (uuid.uuid4(), ext)
    return f'{instance.category.id}-{instance.name}-{filename.split('.')[0]}-{newfilename}'


import datetime
# Unix timestamp as a string
timestamp_str = '1638316800'
# Convert string to integer
timestamp = int(timestamp_str)
# Convert timestamp to datetime object
date = datetime.datetime.fromtimestamp(timestamp)
# Print the date in a readable format
print(date.strftime('%Y-%m-%d %H:%M:%S'))