import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import selectAllPokemon from './reducers/selectors';
import { requestAllPokemon, receiveAllPokemon } from './actions/pokemon_actions';
import { fetchAllPokemon } from './util/api_util';
import configureStore  from './store/store';
import { HashRouter, Route } from "react-router-dom";


window.receiveAllPokemon = receiveAllPokemon;
window.requestAllPokemon = requestAllPokemon;
window.fetchAllPokemon = fetchAllPokemon;
window.selectAllPokemon = selectAllPokemon;

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  const rootEl = document.getElementById('root');
  
  ReactDOM.render(<Root store={store} />, rootEl);
});
