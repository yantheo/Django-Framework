import base64, uuid
from django.core.files.base import ContentFile

def get_report_image(data):
  f , str_image = data.split(';base64')
  decoded_img = base64.b64decode(str_image)
  image_name = str(uuid.uuid4())[:10] + '.png'
  data = ContentFile(decoded_img, name=image_name)
  return data