// pushZip.js
import fs from "fs";

const username = "bobeire";
const repo = "CopilotAutoSaves";
const token = process.env.GITHUB_PAT;

const zipBuffer = fs.readFileSync("./project.zip");

async function createRepo() {
    await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json"
        },
        body: JSON.stringify({ name: repo, private: false })
    }).catch(() => {});
}

async function createRelease() {
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}/releases`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json"
        },
        body: JSON.stringify({
            tag_name: "v1.0.0",
            name: "v1.0.0",
            body: "Autonomous compiler ZIP export"
        })
    });

    const json = await res.json();
    console.log("Release response:", json);   // ADD THIS
    return json;
}


async function uploadAsset(release) {
    const uploadUrl = release.upload_url.replace("{?name,label}", `?name=project.zip`);

    await fetch(uploadUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/zip"
        },
        body: zipBuffer
    });
}

(async () => {
    await createRepo();
    const release = await createRelease();
    await uploadAsset(release);
    console.log("ZIP pushed successfully.");
})();
