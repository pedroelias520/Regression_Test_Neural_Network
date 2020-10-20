#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Oct  5 22:55:19 2020

@author: rangelnunes
"""
import pandas as pd

dataset = pd.read_csv('adult.csv')

# duas formas diferentes de dividir os atributos previstores e o atributo meta
# use apenas uma delas

# primeira forma
# pegando o nome das colunas, para criar o grafico da arvore de decisao
feature_cols = dataset.iloc[:, 0:14].columns
X = dataset[feature_cols].values
y = dataset['income'].values

# segunda forma
X = dataset.iloc[:, 0:14].values
y = dataset.iloc[:, 14].values

# LABEL ENCODER: conversao dos atributos categoricos em numericos
from sklearn.preprocessing import LabelEncoder
#encoder_x = LabelEncoder()

# convertendo os atributos previsores
#X[:,1] = encoder_x.fit_transform(X[:,1])
#X[:,3] = encoder_x.fit_transform(X[:,3])
#X[:,5] = encoder_x.fit_transform(X[:,5])
#X[:,6] = encoder_x.fit_transform(X[:,6])
#X[:,7] = encoder_x.fit_transform(X[:,7])
#X[:,8] = encoder_x.fit_transform(X[:,8])
#X[:,9] = encoder_x.fit_transform(X[:,9])
#X[:,13] = encoder_x.fit_transform(X[:,13])

# convertendo o atributo meta
encoder_y = LabelEncoder()
y = encoder_y.fit_transform(y)

# ONE HOT ENCODER
# https://towardsdatascience.com/columntransformer-in-scikit-for-labelencoding-and-onehotencoding-in-machine-learning-c6255952731b
from sklearn.preprocessing import OneHotEncoder


from sklearn.compose import ColumnTransformer
transformer = ColumnTransformer([('onehots', OneHotEncoder(), [1, 3, 5, 6, 7, 8, 9, 13])],remainder='passthrough')
X = transformer.fit_transform(X).toarray()

# ESCALONAMENTO DOS DADOS
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()

X = scaler.fit_transform(X)

# DIVISAO DA BASE: entre os dados de treinamento e os dados de teste
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3, random_state=0)

# balanceamento de dados
from imblearn.under_sampling import RandomUnderSampler
rus = RandomUnderSampler()
X_train, y_train = rus.fit_sample(X_train, y_train)

from sklearn.neural_network import MLPClassifier
clf = MLPClassifier(verbose=True, max_iter=500, tol=0.00000010)
clf = clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)

from sklearn import metrics

accuracy = metrics.accuracy_score(y_test, y_pred)
print('Acurácia %.2f%% ' %(accuracy * 100.0))
print(metrics.confusion_matrix(y_test,y_pred))
