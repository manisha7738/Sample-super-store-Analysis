from src.data_loader import load_data, preprocess_data, split_features_target
from src.analysis import calculate_hr_metrics, department_analysis, AttritionPredictor
from src.visualization import (
    plot_attrition_by_department,
    plot_satisfaction_distribution,
    create_salary_boxplot,
    plot_feature_importance
)
from src.utils import create_output_directory, save_metrics, export_analysis

def main():
    # Create output directory
    create_output_directory()
    
    # Load and preprocess data
    print("Loading and preprocessing data...")
    df = load_data('hr_data.csv')
    df_processed = preprocess_data(df)
    
    # Calculate HR metrics
    print("Calculating HR metrics...")
    metrics = calculate_hr_metrics(df_processed)
    save_metrics(metrics, 'outputs/reports/hr_metrics.json')
    
    # Perform department analysis
    print("Analyzing department metrics...")
    dept_metrics = department_analysis(df_processed)
    export_analysis(dept_metrics, 'department_analysis')
    
    # Create visualizations
    print("Generating visualizations...")
    plot_attrition_by_department(df_processed, 'outputs/visualizations')
    plot_satisfaction_distribution(df_processed, 'outputs/visualizations')
    create_salary_boxplot(df_processed, 'outputs/visualizations')
    
    # Train attrition prediction model
    print("Training attrition prediction model...")
    X, y = split_features_target(df_processed)
    predictor = AttritionPredictor()
    model_metrics = predictor.train(X, y)
    save_metrics(model_metrics, 'outputs/reports/model_metrics.json')
    
    # Generate feature importance plot
    feature_importance = predictor.get_feature_importance(X.columns.tolist())
    plot_feature_importance(feature_importance, 'outputs/visualizations')
    
    print("Analysis completed successfully!")

if __name__ == "__main__":
    main()