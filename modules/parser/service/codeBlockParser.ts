export function parseCodeBlocks(message: string) {
    const blocks = [];
    const regex = /```([\s\S]*?)```/g;
    let match;

    while ((match = regex.exec(message)) !== null) {
        blocks.push({
            content: match[1],
            virtualPath: extractVirtualPath(match[1])
        });
    }

    return blocks;
}

function extractVirtualPath(content: string) {
    const firstLine = content.split("\n")[0];
    if (firstLine.startsWith("// file:")) {
        return firstLine.replace("// file:", "").trim();
    }
    return "unknown/" + Date.now() + ".txt";
}
