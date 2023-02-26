export default function SERVER_URL() {
  return window.location.hostname === "localhost" ? "http://localhost:3561" : "https://repl.co"
}
