import { Utils } from './extesions';

export class Execute<TEntity> {

	public readonly message: string;
	public readonly messages: ExecuteMessage[] = [];
	public hasError = false;
	public hasWarning = false;
	public hasException = false;
	public entity: TEntity;

	constructor()
	constructor(entity?: TEntity)
	constructor(entity?: TEntity, execute?: Execute<any>) {
		this.entity = entity;

		if (execute) {
			this.mergeMessages(execute);
		}
	}

	public addMessage(type: MessageType | Error, message: string) {
		if (type instanceof Error) {
			this.hasException = true;
			this.messages.push({ type: MessageType.Exception, message: type.message });
			return;
		}

		switch (type) {
			case MessageType.Error:
				this.hasError = true;
				break;
			case MessageType.Warning:
				this.hasWarning = true;
				break;
			default:
				break;
		}

		this.messages.push({ type, message });
	}

	public mergeMessages(execute: Execute<any>): void {
		execute.messages.forEach(message => this.addMessage(message.type, message.message));
	}
}

export enum MessageType {
	Error = 0,
	Warning = 1,
	Exception = 2
}

export class ExecuteMessage {
	constructor(public readonly message: string, public readonly type: MessageType) {
	}
}
