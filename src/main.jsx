import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/index.jsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux"; // ✅ import Provider
import store from "./redux/store.js"; // ✅ apna redux store

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}> {/* ✅ Wrap with Provider */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);