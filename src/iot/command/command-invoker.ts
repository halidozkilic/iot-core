// command-invoker.ts

import { Command } from './close-all-command.interface';

export class CommandInvoker {
    private command: Command | null = null;

    setCommand(command: Command): void {
        this.command = command;
    }

    executeCommand(): void {
        if (this.command) {
            this.command.execute();
        } else {
            console.log('No command set.');
        }
    }
}
