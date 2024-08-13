import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { readTokenFromLocalStorage } from '../../utils/token';

const API_URL = import.meta.env.VITE_ADART_GRAPHQL_API;

const httpLink = createHttpLink({ uri: API_URL });

const authLink = setContext((_, { headers }) => {
  const token = readTokenFromLocalStorage();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // TODO: Later can add error link here
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

type Props = {
  children: React.ReactNode;
};

export const ApolloClientProvider = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
