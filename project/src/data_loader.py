import pandas as pd
from typing import Tuple
import numpy as np

def load_data(filepath: str) -> pd.DataFrame:
    """
    Load HR data from CSV file
    """
    return pd.read_csv(filepath)

def preprocess_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Preprocess the HR data by handling missing values and encoding categorical variables
    """
    df_processed = df.copy()
    
    # Handle missing values
    numeric_columns = df_processed.select_dtypes(include=['float64', 'int64']).columns
    df_processed[numeric_columns] = df_processed[numeric_columns].fillna(df_processed[numeric_columns].mean())
    
    # Convert categorical variables
    categorical_columns = df_processed.select_dtypes(include=['object']).columns
    for column in categorical_columns:
        df_processed[column] = df_processed[column].fillna(df_processed[column].mode()[0])
        df_processed[column] = pd.factorize(df_processed[column])[0]
    
    return df_processed

def split_features_target(df: pd.DataFrame) -> Tuple[pd.DataFrame, pd.Series]:
    """
    Split the data into features and target (Attrition)
    """
    X = df.drop('Attrition', axis=1)
    y = df['Attrition']
    return X, y