export function autoGroup(fs) {
    const groups = {};

    fs.files.forEach((file, path) => {
        const top = path.split("/")[0];
        if (!groups[top]) groups[top] = [];
        groups[top].push(path);
    });

    fs.groups = groups;
    return groups;
}
