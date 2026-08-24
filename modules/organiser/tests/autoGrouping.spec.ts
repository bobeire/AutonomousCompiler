import { autoGroup } from "../service/autoGrouping";

test("groups files by top-level folder", () => {
    const fs = {
        files: new Map([
            ["modules/parser/service/codeBlockParser.ts", {}],
            ["modules/organiser/service/autoGrouping.ts", {}]
        ])
    };

    const groups = autoGroup(fs);
    expect(groups.modules.length).toBe(2);
});
