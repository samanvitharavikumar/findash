from django.urls import path
from .views import (
    transaction_list,
    delete_transaction,
    update_transaction,
    register_user,
)

urlpatterns = [
    path("transactions/", transaction_list),
    path("transactions/<int:id>/delete/", delete_transaction),
    path("transactions/<int:id>/update/", update_transaction),
    path("register/", register_user),
]