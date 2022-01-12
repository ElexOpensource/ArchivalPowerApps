import {searchEntity} from './searchentity';
class toggleCheckBox{

private searchEntity  = new searchEntity();

toggleCheck(event:any,item:any, _popUpService: ComponentFramework.FactoryApi.Popup.PopupService)
    {

    let checkBoxId =<HTMLInputElement> document.getElementById("check");	
    checkBoxId.style.marginLeft = "10px";

            if(event.target.checked){
                let entity =<HTMLInputElement> document.getElementById("entity");
                entity.value = item;
                let logical = <HTMLInputElement> document.getElementById("logical");
                logical.value = item;
                let schema = <HTMLInputElement> document.getElementById("schema");
                schema.value = item;
                _popUpService.closePopup("dwcPopup");
            }
            else {
            }
    }

    
 buttonClick(popUpService: ComponentFramework.FactoryApi.Popup.PopupService){
		popUpService.openPopup('dwcPopup');
		document.getElementById("entitySearch")?.addEventListener("keyup",e=>this.searchEntity.searchEntityList());
	}
}


export {toggleCheckBox}