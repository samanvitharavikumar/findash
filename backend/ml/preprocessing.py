import pandas as pd
import numpy as np


# ==========================================
# MAPPINGS USED DURING MODEL TRAINING
# ==========================================

MONTH_MAP = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8
}

CREDIT_MIX_MAP = {
    "Bad": 0,
    "Standard": 1,
    "Good": 2,
    "Unknown": -1
}

PAYMENT_MIN_MAP = {
    "No": 0,
    "NM": 1,
    "Yes": 2
}


# ==========================================
# CATEGORICAL VALUES
# ==========================================

OCCUPATIONS = [
    "Accountant",
    "Architect",
    "Developer",
    "Doctor",
    "Engineer",
    "Entrepreneur",
    "Journalist",
    "Lawyer",
    "Manager",
    "Mechanic",
    "Media_Manager",
    "Musician",
    "Scientist",
    "Teacher",
    "Unknown",
    "Writer"
]

LOAN_TYPES = [
    "Payday Loan",
    "Home Equity Loan",
    "Mortgage Loan",
    "Student Loan",
    "Debt Consolidation Loan",
    "Auto Loan",
    "Not Specified",
    "Credit-Builder Loan",
    "Personal Loan"
]

PAYMENT_BEHAVIOURS = [
    "High_spent_Large_value_payments",
    "High_spent_Medium_value_payments",
    "High_spent_Small_value_payments",
    "Low_spent_Large_value_payments",
    "Low_spent_Medium_value_payments",
    "Low_spent_Small_value_payments",
    "Unknown"
]


# ==========================================
# TRAINING MEDIANS
# ==========================================

TRAINING_MEDIANS = {
    "Month": 4.5,
    "Age": 34.0,
    "Annual_Income": 37550.74,
    "Monthly_Inhand_Salary": 3093.745,
    "Num_Bank_Accounts": 6.0,
    "Num_Credit_Card": 5.0,
    "Interest_Rate": 13.0,
    "Num_of_Loan": 3.0,
    "Delay_from_due_date": 18.0,
    "Num_of_Delayed_Payment": 14.0,
    "Changed_Credit_Limit": 9.4,
    "Num_Credit_Inquiries": 6.0,
    "Credit_Mix": 1.0,
    "Outstanding_Debt": 1166.37,
    "Credit_Utilization_Ratio": 32.30578367171092,
    "Credit_History_Age": 219.0,
    "Payment_of_Min_Amount": 2.0,
    "Total_EMI_per_month": 69.24947329972044,
    "Amount_invested_monthly": 128.95453805190283,
    "Monthly_Balance": 336.73122455696387
}


# ==========================================
# PREPROCESSING FUNCTION
# ==========================================

def preprocess_customer(data):

    # Convert dictionary into one-row DataFrame
    df = pd.DataFrame([data])

    # ======================================
    # 1. NUMERIC FEATURES
    # ======================================

    numeric_columns = [
        "Age",
        "Annual_Income",
        "Monthly_Inhand_Salary",
        "Num_Bank_Accounts",
        "Num_Credit_Card",
        "Interest_Rate",
        "Num_of_Loan",
        "Delay_from_due_date",
        "Num_of_Delayed_Payment",
        "Changed_Credit_Limit",
        "Num_Credit_Inquiries",
        "Outstanding_Debt",
        "Credit_Utilization_Ratio",
        "Credit_History_Age",
        "Total_EMI_per_month",
        "Amount_invested_monthly",
        "Monthly_Balance"
    ]

    for col in numeric_columns:
        df[col] = pd.to_numeric(
            df[col],
            errors="coerce"
        )

    # Fill missing numeric values
    for col in numeric_columns:
        df[col] = df[col].fillna(
            TRAINING_MEDIANS[col]
        )

    # ======================================
    # 2. MONTH
    # ======================================

    df["Month"] = df["Month"].map(MONTH_MAP)

    df["Month"] = df["Month"].fillna(
        TRAINING_MEDIANS["Month"]
    )

    # ======================================
    # 3. CREDIT MIX
    # ======================================

    df["Credit_Mix"] = (
        df["Credit_Mix"]
        .replace("_", "Unknown")
        .fillna("Unknown")
        .map(CREDIT_MIX_MAP)
    )

    df["Credit_Mix"] = df["Credit_Mix"].fillna(
        TRAINING_MEDIANS["Credit_Mix"]
    )

    # ======================================
    # 4. PAYMENT OF MINIMUM AMOUNT
    # ======================================

    df["Payment_of_Min_Amount"] = (
        df["Payment_of_Min_Amount"]
        .replace("_", "NM")
        .fillna("NM")
        .map(PAYMENT_MIN_MAP)
    )

    df["Payment_of_Min_Amount"] = df[
        "Payment_of_Min_Amount"
    ].fillna(
        TRAINING_MEDIANS["Payment_of_Min_Amount"]
    )

    # ======================================
    # 5. OCCUPATION
    # ======================================

    occupation = (
        df["Occupation"]
        .fillna("Unknown")
        .replace("_______", "Unknown")
    )

    for occupation_name in OCCUPATIONS:

        column_name = (
            "Occupation_" + occupation_name
        )

        df[column_name] = (
            occupation == occupation_name
        ).astype(int)

    # ======================================
    # 6. LOAN TYPES
    # ======================================

    loan_data = (
        df["Type_of_Loan"]
        .fillna("Unknown")
    )

    for loan in LOAN_TYPES:

        column_name = (
            "Has_"
            + loan.replace(" ", "_")
            .replace("-", "_")
        )

        def has_loan(value):

            if value == "Unknown":
                return 0

            loans = [
                item.strip()
                .removeprefix("and ")
                .strip()
                for item in value.split(",")
            ]

            return int(loan in loans)

        df[column_name] = loan_data.apply(
            has_loan
        )

    # ======================================
    # 7. PAYMENT BEHAVIOUR
    # ======================================

    behaviour = (
        df["Payment_Behaviour"]
        .fillna("Unknown")
        .replace("!@9#%8", "Unknown")
    )

    for behaviour_name in PAYMENT_BEHAVIOURS:

        column_name = (
            "Payment_Behaviour_"
            + behaviour_name
        )

        df[column_name] = (
            behaviour == behaviour_name
        ).astype(int)

    # ======================================
    # 8. EXACT MODEL FEATURES
    # ======================================

    feature_columns = [
        "Month",
        "Age",
        "Annual_Income",
        "Monthly_Inhand_Salary",
        "Num_Bank_Accounts",
        "Num_Credit_Card",
        "Interest_Rate",
        "Num_of_Loan",
        "Delay_from_due_date",
        "Num_of_Delayed_Payment",
        "Changed_Credit_Limit",
        "Num_Credit_Inquiries",
        "Credit_Mix",
        "Outstanding_Debt",
        "Credit_Utilization_Ratio",
        "Credit_History_Age",
        "Payment_of_Min_Amount",
        "Total_EMI_per_month",
        "Amount_invested_monthly",
        "Monthly_Balance"
    ]

    feature_columns += [
        "Occupation_" + occupation_name
        for occupation_name in OCCUPATIONS
    ]

    feature_columns += [
        "Has_"
        + loan.replace(" ", "_")
        .replace("-", "_")
        for loan in LOAN_TYPES
    ]

    feature_columns += [
        "Payment_Behaviour_" + behaviour_name
        for behaviour_name in PAYMENT_BEHAVIOURS
    ]

    # ======================================
    # 9. RETURN EXACT 52 FEATURES
    # ======================================

    return df[feature_columns]