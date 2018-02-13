/***************************************** WARNING *****************************************/
/* Don't write any code in this file, because it will be rewritten on the next generation. */
/*******************************************************************************************/

import { ExecuteMessageType } from "./enum";

export interface IExecute<TEntity> {
    Entity: TEntity; 
    HasErro: boolean; 
    HasException: boolean; 
    HasWarning: boolean; 
    Messages: Array<IExecuteMessage>; 
}

export interface IExecuteMessage {
    Type: ExecuteMessageType; 
    Message: string; 
}

