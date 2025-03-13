from django_cron import CronJobBase, Schedule
from myapp.models import Menu
from django.utils import timezone

class UpdateMenuCronJob(CronJobBase):
    RUN_EVERY_MIDNIGHT = Schedule(run_at_times=['00:00'])

    def do(self):
        # 자정마다 실행될 코드
        # 예: 새로운 날짜의 식단을 생성하거나 업데이트하는 코드
        Menu.objects.create(date=timezone.now().date(), breakfast='새로운 아침 메뉴', lunch='새로운 점심 메뉴')