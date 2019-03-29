export declare class CommandArgvParser {
    private commands;
    private simplifideCommands;
    private commandArgValueMap;
    private projectVersion;
    private projectName;
    constructor();
    hasCommand(name: any): boolean;
    parseCommandArgs(): string;
    commandArgs(): string;
    commandHelp(): void;
    get(name: any): string | boolean;
    versionInfo(): void;
}
