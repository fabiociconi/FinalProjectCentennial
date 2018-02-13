/***************************************** WARNING *****************************************/
/* Don't write any code in this file, because it will be rewritten on the next generation. */
/*******************************************************************************************/

import { EntityAction } from "./enum";

export interface ISampleTableEntity {
    IdSample: string; 
    Value: string; 
    Valid: boolean; 
    Action: EntityAction; 
}

export interface ISampleTableFilter {
    Key?: string; 
    Keys?: Array<string>; 
    PageNumber?: number; 
    PageSize?: number; 
}

