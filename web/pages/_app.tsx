import App from 'next/app';
import 'isomorphic-unfetch';
import React from 'react';
import {
  ClientContextProvider as FetchingProvider,
  QueryResponse
} from 'react-fetching-library';

import { client } from '../libs/fetching';

interface IProps {
  cacheItems: { [key: string]: QueryResponse<any> };
}

export default class MyApp extends App<IProps> {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
      cacheItems: client.cache.getItems()
    };
  }

  render() {
    const { Component, pageProps, cacheItems } = this.props;
    client.cache.setItems(cacheItems);

    return (
      <FetchingProvider client={client}>
        <Component {...pageProps} />
      </FetchingProvider>
    );
  }
}
