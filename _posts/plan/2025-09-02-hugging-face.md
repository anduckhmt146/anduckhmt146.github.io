---
layout: post
title: Hugging Face - AI
date: 2025-09-02
categories: plan
---

# 1. Machine Learning

## 1.1. Supervised Learning

- Data has label.

- Example:
  - Predict house prices.
  - Classify email is spam or not.
  - Recoginize handwritten digits.

## 1.2. Unsupervised Learning.

- Group data by patterns

- Example:
  - Classify customer to segments.
  - Detect anomolies in financial transaction.
  - Reduce dimensions of data for easier visualization.

## 1.3. Reinforcement Learning

- Learning by rewards and penalties

- Example:
  - Robotics
  - Game development, AI agents.
  - Dynamic pricing system.

# 2. Deep learning

## 2.1. Neural networks work

- Appky in image recognition, natural language processing, speech synthesis.

- Contains:

  - Input layer: input data.
  - Hidden Layers: multiple mathematic computations to identify patterns.
  - Output Layer: produce the result, classify label or numerical value.

- Activation functions: determine how signals are pased through the network

  - ReLU: number/linear.
  - Sigmoid: Binary classification problem 0 or 1.
  - Softmax statistic tasks from 0 - 1.

- Training neural network: backpropagation.

# 3. Machine Learning Programming

- Using the library scikit-learn.

## 3.1. Dataset Utilities

- load: load smallm built-in datasets.

- fetch: fetch larger datasets from external sources.

## 3.2. Preprocessing tools

- StandardScaler: scale missing data to average, standar deviation.

- MinMaxScaler: Change numbers to fit within a range.

- OneHotEncoder: Covert text data into numbers by change it to a column 0 or 1.

## 3.3. Paramameters:

- param_grid: n_estimators, max_depth, min_samples_split for Grid Search.

- Machine learning models: LinearRegression, LogisticRegression, RandomForestClassifier (Decision Tree), SupportVectorMachines (Hyperlane),

## 3.4. Key metrics

- Accuracy: If a model makes 100 predictions and 90 are correct, the accuracy = 90%.

- Precision: If the model predicts 20 people have a disease, but only 15 really do, precision = 15/20 = 75%.

- Recall: If 30 people actually have a disease, and the model correctly identifies 25, recall = 25/30 = 83%.

- F1 Score: Harmonic mean of Precision and Recall, If Precision = 75% and Recall = 83%, then F1 ≈ 79%.

- Support: 70 healthy, 30 sick → Support for "healthy" = 70, Support for "sick" = 30.

# 4. Building Content Moderation System

## 4.1. Decision Tree (Text/Structure Data)

- The model is work well for text but not image/audio.

- Model: DecisionTreeClassifier, RandomForestClassifier.

## 4.2. CNN (Image Data)

- Split the image to small parts, analyze them and stick everything together.

- Encoder: AutoFeatureExtractor, AutoModelForImageClassification

- Model: google/vit-base-patch16-224.

## 4.3. RNN (Sequential Data)

- Remember past input to make sense the current one.

- Encoder: AutoTokenizer

- Model: AutoModelForCausalLM("gpt2"), know how to continue the sentences.

## 4.4. Transformer (NLP and Vision)

- Using tensorflow, transformer.

- Encoder: BertTokenizer, bert-based-uncased.

- Model: TFBertModel, bert-base-uncased.

![](/images/HuggingFace/models.png)
