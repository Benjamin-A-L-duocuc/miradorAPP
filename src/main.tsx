import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"

async function start() {
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import("./mocks/browser")
      await worker.start({ onUnhandledRequest: "bypass" })
    } catch (e) {
      console.warn("MSW failed to start, using fallback:", e)
      await import("./mocks/prod-fallback")
    }
  } else {
    await import("./mocks/prod-fallback")
  }
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

start()
