import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchEstoques } from './components/FetchEstoques';
import { AddEstoque } from './components/AddEstoque';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/' component={FetchEstoques} />
            <Route path='/fetch-estoques' component={FetchEstoques} />
            <Route path='/addestoque' component={AddEstoque} />
            <Route path='/estoque/edit/:id' component={AddEstoque} />
      </Layout>
    );
  }
}
