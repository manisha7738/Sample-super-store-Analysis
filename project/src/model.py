from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import pandas as pd
import numpy as np
from typing import Dict, Tuple

class ChurnPredictor:
    def __init__(self, random_state: int = 42):
        self.model = RandomForestClassifier(random_state=random_state)
        
    def train(self, X: pd.DataFrame, y: pd.Series) -> None:
        """
        Train the model on the given data
        """
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        self.model.fit(X_train, y_train)
        self.evaluate(X_test, y_test)
        
    def evaluate(self, X_test: pd.DataFrame, y_test: pd.Series) -> Dict:
        """
        Evaluate the model and return performance metrics
        """
        y_pred = self.model.predict(X_test)
        
        report = classification_report(y_test, y_pred, output_dict=True)
        conf_matrix = confusion_matrix(y_test, y_pred)
        
        return {
            'classification_report': report,
            'confusion_matrix': conf_matrix
        }
    
    def get_feature_importance(self, feature_names: list) -> Dict[str, float]:
        """
        Get the importance of each feature in the model
        """
        importance = self.model.feature_importances_
        return dict(zip(feature_names, importance))