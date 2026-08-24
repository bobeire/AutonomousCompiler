import { parseCodeBlocks } from "../service/codeBlockParser";

test("extracts code blocks", () => {
    const msg = "Here is code:\n```// file:test.ts\nconsole.log('hi');```";
    const blocks = parseCodeBlocks(msg);
    expect(blocks.length).toBe(1);
    expect(blocks[0].virtualPath).toBe("test.ts");
});
