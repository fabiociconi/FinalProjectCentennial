const PathHelper = {
    Root: "..",
    SetRoot(root: string): void {
        this.Root = root;
    },

    GetRoot: function() {
        return this.Root;
    },

    GetPath(args: Array<string>): string {
        var result = [__dirname, this.Root, ...args];
        return result.join("/");
    }
};

export default PathHelper;