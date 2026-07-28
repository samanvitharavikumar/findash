from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Transaction
from .prompt_builder import build_prompt
from .ai_Service import ask_gemini


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ai_helper(request):

    question = request.data.get("question")

    user = request.user

    transactions = Transaction.objects.filter(user=user)

    income = sum(
        t.amount
        for t in transactions
        if t.type == "Income"
    )

    expense = sum(
        t.amount
        for t in transactions
        if t.type == "Expense"
    )

    balance = income - expense

    expense_transactions = [
        t for t in transactions
        if t.type == "Expense"
    ]

    if expense_transactions:
        largest = max(
            expense_transactions,
            key=lambda x: x.amount
        )

        largest_expense = (
            f"{largest.title} (${largest.amount})"
        )
    else:
        largest_expense = "None"

    summary = {
        "income": income,
        "expense": expense,
        "balance": balance,
        "largest_expense": largest_expense,
    }

    prompt = build_prompt(
        summary,
        transactions,
        question,
    )

    try:

        answer = ask_gemini(prompt)

        return Response({
            "answer": answer
        })

    except Exception as e:

        return Response(
            {
                "error": str(e)
            },
            status=500,
        )