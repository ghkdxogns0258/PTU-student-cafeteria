# myapp/apps.py

from django.apps import AppConfig
from django.db.models.signals import post_migrate

class MyAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'myapp'

    def ready(self):
        # 여기에 앱 초기화와 관련된 작업을 추가할 수 있습니다.
        import myapp.cron  # 모델을 가져옴

def my_callback(sender, **kwargs):
    # post_migrate 시그널을 사용하여 앱이 초기화된 후에 실행될 콜백을 등록합니다.
    from myapp.models import Menu  # 모델을 가져옴

post_migrate.connect(my_callback, sender=MyAppConfig)