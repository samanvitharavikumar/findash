from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Transaction
from .serializers import TransactionSerializer


@api_view(["GET", "POST"])
def transaction_list(request):

    if request.method == "POST":

        serializer = TransactionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    transactions = Transaction.objects.all()

    serializer = TransactionSerializer(
        transactions,
        many=True
    )

    return Response(serializer.data)

@api_view(["DELETE"])
def delete_transaction(request, id):

    try:
        transaction = Transaction.objects.get(id=id)

    except Transaction.DoesNotExist:
        return Response(
            {"error": "Transaction not found"},
            status=404
        )

    transaction.delete()

    return Response(
        {"message": "Transaction deleted successfully"},
        status=200
    )
@api_view(["PUT"])
def update_transaction(request, id):

    try:
        transaction = Transaction.objects.get(id=id)

    except Transaction.DoesNotExist:
        return Response(
            {"error": "Transaction not found"},
            status=404
        )

    serializer = TransactionSerializer(
        transaction,
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)