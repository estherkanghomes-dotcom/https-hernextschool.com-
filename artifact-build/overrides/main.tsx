import "./styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { RouterProvider, createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
const queryClient = new QueryClient();
const router = createRouter({ routeTree, context: { queryClient }, history: createHashHistory(), scrollRestoration: true });
createRoot(document.getElementById("root")!).render(<StrictMode><RouterProvider router={router} /></StrictMode>);
