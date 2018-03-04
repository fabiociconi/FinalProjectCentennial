export const PreSaveDateCheck = (entity: { createdAt?: Date, updatedAt?: Date, __v?: number }): void => {
	const now = new Date();

	if (!entity.createdAt) {
		entity.createdAt = now;
	}

	entity.updatedAt = now;
	entity.__v = entity.__v + 1 || 1;
}
