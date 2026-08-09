import joblib

from preprocessing import preprocess_customer


# Load trained model
model = joblib.load("credit_score_model.pkl")


# Test customer
customer = {
    "Month": "August",
    "Age": 34,
    "Annual_Income": 50000,
    "Monthly_Inhand_Salary": 4000,
    "Num_Bank_Accounts": 4,
    "Num_Credit_Card": 3,
    "Interest_Rate": 12,
    "Num_of_Loan": 2,
    "Delay_from_due_date": 5,
    "Num_of_Delayed_Payment": 2,
    "Changed_Credit_Limit": 1000,
    "Num_Credit_Inquiries": 2,
    "Credit_Mix": "Good",
    "Outstanding_Debt": 2000,
    "Credit_Utilization_Ratio": 30,
    "Credit_History_Age": 96,
    "Payment_of_Min_Amount": "Yes",
    "Total_EMI_per_month": 1000,
    "Amount_invested_monthly": 500,
    "Monthly_Balance": 2500,

    "Occupation": "Engineer",

    "Type_of_Loan":
        "Auto Loan, Personal Loan",

    "Payment_Behaviour":
        "High_spent_Small_value_payments"
}


# Preprocess
processed_data = preprocess_customer(customer)

print("Number of features:", processed_data.shape[1])

print("\nFeatures:")
print(processed_data.columns.tolist())

print("\nMissing values:")
print(processed_data.isnull().sum().sum())


# Predict
prediction = model.predict(processed_data)[0]

print("\nPrediction:", prediction)


# Convert number back to label
score_labels = {
    0: "Poor",
    1: "Standard",
    2: "Good"
}

print("Credit Score:", score_labels[prediction])