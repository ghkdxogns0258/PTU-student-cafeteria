from django.db import models

class Menu(models.Model):
    date = models.DateField(unique=True)
    breakfast = models.TextField()
    lunch = models.TextField()
    breakfast_sold_out = models.BooleanField(default=False)
    lunch_sold_out = models.BooleanField(default=False)
    breakfast_sold_out_time = models.DateTimeField(null=True, blank=True)  # 아침 메뉴 매진 시간
    lunch_sold_out_time = models.DateTimeField(null=True, blank=True)  # 점심 메뉴 매진 시간

    def __str__(self):
        return f"Menu for {self.date}"
