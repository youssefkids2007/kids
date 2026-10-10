const form = document.querySelector("#auth-form");
const tokenInput = document.querySelector("#auth");
const result = document.querySelector("#result");
const button = form.querySelector("button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const token = tokenInput.value.trim();
  if (!token) return;

  button.disabled = true;
  result.textContent = "Checking…";
  try {
    // POST keeps the token out of the URL and ordinary browser history.
    const response = await fetch("/api/mayhem/KeyboardAuth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auth: token })
    });
    const data = await response.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch {
    result.textContent = "Could not reach the API. Check that the PHP server is running.";
  } finally {
    button.disabled = false;
    tokenInput.value = "";
  }
});
