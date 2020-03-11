from django.contrib import admin

from .models import Investment
from .forms import CustomInvestmentCreationForm, CustomInvestmentChangeForm


class CustomInvestmentAdmin(admin.ModelAdmin):
    add_form = CustomInvestmentCreationForm
    form = CustomInvestmentChangeForm
    model = Investment
    list_display = ['asset', 'amount']


admin.site.register(Investment)
