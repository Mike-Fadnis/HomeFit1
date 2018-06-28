import React, { Component } from 'react';
import { AppRegistry } from "react-native";

//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

//Redux Saga
import createSagaMiddleware from 'redux-saga';

import allReducers from '@reducers/index';
import MainApp from "./App";

const sagaMiddleware = createSagaMiddleware();
let store = createStore(applyMiddleware(sagaMiddleware));

AppRegistry.registerComponent("NativebaseKitchenSink", () => App);

const App = () => ( 
    <Provider store = {store} >
        <MainApp / >
    </Provider>
)