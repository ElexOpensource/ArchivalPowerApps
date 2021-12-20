import { IInputs } from '../generated/ManifestTypes';
import { Constants } from './constants';
import {searchEntity} from './searchentity';

class toggleCheckBox extends Constants{

private searchEntity  = new searchEntity();


toggleCheck(event:any, item:string, _popUpService:ComponentFramework.FactoryApi.Popup.PopupService,context:ComponentFramework.Context<IInputs>)
    {
        context.webAPI.retrieveMultipleRecords(this.entityEntity,this.getLogicalNameFromEntity+item+"'").then(
        (result) =>{
            if(result !== null && result.entities.length !== 0){
            for (let ent of result.entities){
                this.logicalName =  ent[this.entityLogicalName];
                }
        
    let checkBoxId =<HTMLInputElement> document.getElementById("check");	
    checkBoxId.style.marginLeft = this.popUpAndToggleMarginLeft;

            if(event.target.checked){
                let entity =<HTMLInputElement> document.getElementById(this.formEntityID);
                entity.value = item;
                let logical = <HTMLInputElement> document.getElementById(this.formLogicalID);
                logical.value = this.logicalName;
                let schema = <HTMLInputElement> document.getElementById(this.formSchemaID);
                schema.value = item;
                _popUpService.closePopup(this.popUpName);
                checkBoxId.checked = false;
            }
        }
            else {
            }
        });
    }
 buttonClick(popUpService: ComponentFramework.FactoryApi.Popup.PopupService){
		popUpService.openPopup(this.popUpName);
		document.getElementById("entitySearch")?.addEventListener("keyup",e=>this.searchEntity.searchEntityList());
	}
}


export { toggleCheckBox }