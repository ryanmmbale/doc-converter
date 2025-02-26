document.getElementById("uploadForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const file = document.getElementById("fileInput").files[0];
    const fileType = document.getElementById("fileType").value;
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    document.getElementById("message").innerText = "Processing...";

    const response = await fetch(`http://localhost:3000/convert/${fileType}`, {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted.html";
        document.body.appendChild(a);
        a.click();
        a.remove();
        document.getElementById("message").innerText = "Download complete!";
    } else {
        document.getElementById("message").innerText = "Conversion failed.";
    }
});
//..............theme button.................//
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    // Save the theme preference
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

// Load theme preference on page load
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}
