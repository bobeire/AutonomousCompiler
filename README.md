AutonomousCompiler
A fully automated, self‑organising virtual filesystem compiler that parses AI‑generated code, groups modules intelligently, generates tests, builds documentation, and exports complete project archives. Designed for autonomous development workflows and CI/CD pipelines.

✨ Features
Automated Parsing — Extracts code blocks from AI messages and assigns virtual paths

Smart Grouping — Organises files by module, domain, or top‑level folder

Metadata Tracking — Maintains versioning, file lineage, and archive manifests

Test Generation — Creates module‑level unit tests automatically

Diagram Output — Generates Mermaid architecture diagrams

Runtime Emulation — Logs compiler events for debugging

Pre‑Compilation Optimisation — Stores bytecode‑like precompiled artifacts

Full Project Export — Produces ZIP archives or folder exports for GitHub releases

CI/CD Ready — Works seamlessly with GitHub Actions workflows

📁 Project Structure
Code
```
AutonomousCompiler/
├── modules/
│   ├── parser/
│   ├── organiser/
│   └── diagrams/
├── docs/
├── runtime/
├── optimisation/
├── metadata/
└── VERSION
```
Each module contains:

service/ — core logic

tests/ — Jest test suites

metadata.json — module metadata

🚀 Getting Started

Install dependencies

```
npm install
```
Run tests
```
npm test
```
Build
```
npm run build
```
Export project ZIP

Use the compiler’s export function or your local script.

📦 Pushing to GitHub

This project includes a safe, local‑execution GitHub push workflow using your environment‑stored PAT.

Push ZIP:
```
node pushZip.js
```
Push full folder:

```
node pushFolder.js
```

For details, see:
Push full project folder  
Help me push ZIP to GitHub

🔧 CI/CD
A complete GitHub Actions workflow is included:

CI: lint, test, build on every push

Release: build + attach ZIP on version tags

Generate full GitHub CI/CD workflow

📚 Documentation

Documentation lives in /docs:

parser.md — how code extraction works

organiser.md — grouping logic

Architecture diagrams in /modules/diagrams

🧠 How It Works

The AutonomousCompiler processes AI‑generated code by:

Parsing raw messages

Extracting code blocks

Assigning virtual paths

Refactoring structure

Generating tests

Building documentation

Exporting a complete project archive


🤝 Contributing

Contributions are welcome.
Please open an issue or submit a pull request.

📄 License

MIT License

# AutonomousCompiler
Complete automation workflow of Copilot coding

Overview
This guide walks a new user step‑by‑step through:

Installing AutonomousCompiler

Installing the VS Code extension (VSIX)

Configuring the project path

Using JSON + commands to generate and ship code

1. Prerequisites
Node.js installed (LTS recommended)

Visual Studio Code installed

A terminal (PowerShell, cmd, or bash)

2. Install AutonomousCompiler
Open a terminal.

Install globally:

bash
npm install -g autonomous-compiler
Verify:

bash
ac --help
You should see the AutonomousCompiler CLI help.

3. Create an AutonomousCompiler project
Pick a folder for your project, e.g.:

bash
mkdir autonomous-compiler
cd autonomous-compiler
Inside that folder, create a minimal structure:

bash
mkdir modules docs runtime optimisation metadata
echo 0.1.0 > VERSION
You can refine this later; this is enough for the extension to target.

4. Install the VS Code extension (VSIX)
Place your built VSIX file, e.g.:

text
autonomous-compiler-bridge-0.1.0.vsix
Open VS Code.

Press Ctrl+Shift+P.

Run:

text
Extensions: Install from VSIX
Select autonomous-compiler-bridge-0.1.0.vsix.

The extension AutonomousCompiler Bridge is now installed.

5. Configure acBridge.baseDir
You must tell the extension where your AutonomousCompiler project lives.

Method A — Settings UI
In VS Code, press Ctrl+, (open Settings).

In the search box, type: acBridge.

You’ll see:

AutonomousCompiler Bridge › Base Dir

Set it to your project path, e.g.:

text
(LOCATION OF) autonomous-compiler
Method B — Settings JSON
Press Ctrl+Shift+P.

Run:

text
Preferences: Open Settings (JSON)
Add:

json
"acBridge.baseDir": "autonomous-compiler"
Save the file.

6. Using the extension: JSON → Filesystem
The extension understands a simple JSON format:

json
{
  "files": [
    {
      "path": "modules/parser/service/codeBlockParser.ts",
      "content": "export function parseBlocks(input: string) { /* ... */ }"
    },
    {
      "path": "docs/parser.md",
      "content": "# Parser Module\nParses code blocks into AC file definitions."
    }
  ]
}
Steps
Copy the JSON payload.

In VS Code, press Ctrl+Shift+P.

Run:

text
AutonomousCompiler: Apply JSON to Filesystem
Paste the JSON into the input box.

Press Enter.

The extension will:

Create any missing directories.

Write each files[].path with its content under acBridge.baseDir.

7. Using the extension: Selection → File
You can turn any selected text into a file inside your AC project.

Open any file in VS Code.

Select the text you want to save.

Press Ctrl+Shift+P.

Run:

text
AutonomousCompiler: Apply Selection as File
Enter a relative path, e.g.:

text
modules/parser/service/codeBlockParser.ts
Press Enter.

The extension writes the selected text to that path under acBridge.baseDir.

8. Running AutonomousCompiler commands from VS Code
The extension exposes two commands that run AC via a terminal:

AutonomousCompiler: ac export zip

AutonomousCompiler: ac github push

ac export zip
Press Ctrl+Shift+P.

Run:

text
AutonomousCompiler: ac export zip
This opens a terminal in acBridge.baseDir and runs:

bash
npx ac export zip
AC will:

Build your project.

Produce a ZIP archive (location depends on your AC config).

ac github push
Press Ctrl+Shift+P.

Run:

text
AutonomousCompiler: ac github push
This runs:

bash
npx ac github push
AC will:

Commit changes (according to its rules).

Push to the configured GitHub repository.

9. Typical workflow for new users
Set up project  
Create autonomous-compiler folder and basic structure.

Configure extension  
Set acBridge.baseDir to that folder.

Generate code from AI / Copilot  
Ask for output in the JSON format:

json
{
  "files": [
    { "path": "modules/core/service/foo.ts", "content": "..." }
  ]
}
Apply JSON to filesystem  
Use AutonomousCompiler: Apply JSON to Filesystem.

Run AC commands  
Use ac export zip and ac github push from the Command Palette.

You now have a loop:

Chat → JSON → VS Code extension → AC project → ZIP/GitHub.
