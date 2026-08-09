from django.urls import path

from .views import (
    transaction_list,
    delete_transaction,
    update_transaction,
    register_user,
    predict_credit_score,
)

from .ai_views import ai_helper


urlpatterns = [
    path("transactions/", transaction_list),

    path(
        "transactions/<int:id>/",
        delete_transaction
    ),

    path(
        "transactions/<int:id>/update/",
        update_transaction
    ),

    path("register/", register_user),

    path("ai-helper/", ai_helper),

    path(
        "credit-score/",
        predict_credit_score
    ),
]