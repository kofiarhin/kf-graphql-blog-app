import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const client = new ApolloClient({
  uri: "http://localhost:5000", // Apollo Server's URL
  cache: new InMemoryCache(), // Set up cache
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </ApolloProvider>
);
