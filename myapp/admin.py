# admin.py
from django.contrib import admin
from .models import Menu

class MenuAdmin(admin.ModelAdmin):
    list_display = ['date', 'breakfast', 'lunch', 'lunch_sold_out']  # '매진' 여부를 관리자 페이지에서 표시

admin.site.register(Menu, MenuAdmin)