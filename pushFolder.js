// pushFolder.js
import fs from "fs";
import path from "path";

const username = "bobeire";
const repo = "AutonomousCompiler";
const token = process.env.GITHUB_PAT;

if (!token) {
    console.error("GITHUB_PAT is not set.");
    process.exit(1);
}

async function createRepo() {
    const res = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json"
        },
        body: JSON.stringify({ name: repo, private: false })
    });

    if (!res.ok && res.status !== 422) {
        console.error("Repo creation failed:", await res.text());
        process.exit(1);
    }
}

async function uploadFile(githubPath, content) {
    const url = `https://api.github.com/repos/${username}/${repo}/contents/${githubPath}`;

    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json"
        },
        body: JSON.stringify({
            message: `Add ${githubPath}`,
            content: Buffer.from(content).toString("base64")
        })
    });

    if (!res.ok) {
        console.error(`Failed to upload ${githubPath}:`, await res.text());
        process.exit(1);
    }
}

function walk(dir) {
    const results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            results.push(...walk(fullPath));
        } else {
            results.push(fullPath);
        }
    });

    return results;
}

(async () => {
    await createRepo();

    const root = "./AutonomousCompiler";
    const files = walk(root);

    for (const file of files) {
        const content = fs.readFileSync(file);
        const relative = path.relative(root, file).replace(/\\/g, "/");
        await uploadFile(relative, content);
        console.log("Uploaded:", relative);
    }

    console.log("Full project folder pushed successfully.");
})();
