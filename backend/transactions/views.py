from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Transaction
from .serializers import TransactionSerializer


@api_view(["GET"])
def transaction_list(request):
    transactions = Transaction.objects.all()

    serializer = TransactionSerializer(transactions, many=True)

    return Response(serializer.data)