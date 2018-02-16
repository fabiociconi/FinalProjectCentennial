import { ApiModelProperty } from "@nestjs/swagger";
import { EntityBase, AddressEntity } from "./";

export class CompanyEntity extends EntityBase {
	@ApiModelProperty()
	legalName: string;

	@ApiModelProperty()
	comertialName: string;
}

export class WorkshopEntity extends EntityBase {
	@ApiModelProperty()
	company: CompanyEntity;

	@ApiModelProperty()
	address: AddressEntity[];
}