const express = require("express");
const multer = require("multer");
const fs = require("fs");
const mammoth = require("mammoth");

const app = express(); // Define Express app
const upload = multer({ dest: "uploads/" });

app.use(express.static("public")); // Serve static files like index.html

// Serve index.html on root URL
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// DOCX to HTML conversion route
app.post("/convert/docx", upload.single("file"), (req, res) => {
    const filePath = req.file.path;
    
    fs.readFile(filePath, (err, data) => {
        if (err) return res.status(500).send("Error reading DOCX file");

        mammoth.convertToHtml({ buffer: data })
            .then(result => {
                fs.unlinkSync(filePath);
                res.send(`
                    <html>
                    <head><title>Converted DOCX</title></head>
                    <body>
                        <h1>Converted Document</h1>
                        <div>${result.value}</div>
                        <br>
                        <a href="/">Upload Another</a>
                    </body>
                    </html>
                `);
            })
            .catch(() => res.status(500).send("DOCX conversion failed"));
    });
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
