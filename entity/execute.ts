export class Execute<TEntity> {
	hasErro: boolean;
	hasWarning: boolean;
	message: string;
	messages: string[];
	entity: TEntity;
}