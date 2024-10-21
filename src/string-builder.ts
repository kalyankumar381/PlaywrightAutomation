export class StringBuilder {
    private _lines: string[] = [];
    constructor() {
        this._lines = [];
    }

    /**
     * The write method is used to append a string representation of the specified string argument to the StringBuilder object.
     * It appends the string without adding a newline character at the end.
     * @example
     * const builder = new StringBuilder();
     * builder.write('Hello');
     * builder.write(' ');
     * builder.write('World');
     * const result = builder.toString();
     * console.log(result);
     * Output: Hello World
    */
    write(line = ''): void {
        this._lines.push(line);
    }

    /**
     * The writeln method appends the specified string argument to the StringBuilder object, followed by a newline character.
     * This is useful for adding a new line after each string.
     * @example
     * const builder = new StringBuilder();
     * builder.writeln('Hello');
     * builder.writeln('World');
     * const result = builder.toString();
     * console.log(result);
     * Output:
     * Hello
     * World
    */
    writeln(line = ''): void {
        this._lines.push(line);
        this._lines.push('\n');
    }

    /**
     * The toString method is used to convert the content of the StringBuilder object into a String object.
     * It returns a string representation of the content that has been built using the StringBuilder methods.
     * @example
     * const builder = new StringBuilder();
     * builder.write('Hello,');
     * builder.write('world!');
     * const result = builder.toString();
     * console.log(result);
     * Output:
     * Hello,world!
     */
    toString(): string {
        return this._lines.join('');
    }

    /**
     * The clear method is used to clear the content of the StringBuilder object.
     * @example
     * const builder = new StringBuilder();
     * write('Hello');
     * builder.write('World');
     * console.log(builder.toString()); // Output: HelloWorld
     * builder.clear();
     * console.log(builder.toString()); // Output:
     */
    clear(): void {
        this._lines.length = 0;
    }
}
