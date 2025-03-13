from django.shortcuts import render
from .models import Menu
from django.utils import timezone
import json
from django.core.serializers import serialize

def home(request):
    # 모든 날짜의 메뉴를 가져오도록 수정
    menu_list = Menu.objects.all()

    # 현재 날짜와 일치하는 메뉴만 필터링
    current_date = timezone.now().date()
    current_menu = menu_list.filter(date=current_date)

    return render(request, 'menu/index.html', {'menu_list': current_menu, 'current_date': current_date})

def menu(request):
    all_menus = Menu.objects.all().order_by('date')
    # 필드를 명시적으로 지정하여 직렬화
    all_menus_json = serialize('json', all_menus, fields=('date', 'breakfast', 'lunch'))
    return render(request, 'menu/menu.html', {'all_menus_json': all_menus_json})

