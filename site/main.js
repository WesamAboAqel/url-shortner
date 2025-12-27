const button = document.getElementById("shortenBtn");
const input = document.getElementById("urlInput");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
    const original_url = input.value;

    const response = await fetch("/api/url", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ original_url }),
    });

    const info = await response.json();

    result.textContent = `${window.location.origin}/${info.short_url}`;
});
