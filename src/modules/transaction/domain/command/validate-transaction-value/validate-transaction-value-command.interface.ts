import { Command } from '@modules/libs/domain/command/command.interface';

export class ValidateTransactionValueCommand implements Command {

	constructor(id: string, value: number, status: 'pending'){
		this.id = id;
		this.value = value;
		this.status = status;
	}

	id: string;
	value: number;
	status: 'pending';
}