import { StrictMode } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import client from "../client.js";
// const client = new ApolloClient({
//   uri: "http://localhost:5000", // Apollo Server's URL
//   cache: new InMemoryCache(), // Set up cache
// });

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <StrictMode>
        <App />
      </StrictMode>
    </ApolloProvider>
  </Provider>
);
