# myapp/templatetags/custom_filters.py
from django import template
from django.utils import timezone

register = template.Library()

@register.filter(name='is_date_passed')
def is_date_passed(date):
    return date < timezone.now().date()