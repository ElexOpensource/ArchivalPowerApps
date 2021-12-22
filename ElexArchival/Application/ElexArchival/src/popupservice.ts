import { IInputs } from "../generated/ManifestTypes";
import {Constants} from './constants';
import {toggleCheckBox} from './togglecheckbox';

interface PopupDev extends ComponentFramework.FactoryApi.Popup.Popup {
	popupStyle: object;
}
class popUpData extends Constants{

private toggleCheckBox = new toggleCheckBox();

popUpLookUpDetails(context:ComponentFramework.Context<IInputs>, popUpService: ComponentFramework.FactoryApi.Popup.PopupService){
   let result = "", resultSelectedItem ="";
   try{
    context.webAPI.retrieveMultipleRecords(this.entityEntity,this.entityFetchXml).then((response: any)=>{
		if(response!= null){
		for (let ent of response.entities){
		result += ","+ ent['entitysetname'];
	    }
		this.popUpContent = document.createElement('div');
		this.tablePopUpContent = document.createElement('table');
		this.tablePopUpContent.id = "popUpTable";

		this.searchElement = document.createElement("input");
		this.searchElement.id = "entitySearch";

		this.searchElement.setAttribute("type","text");
		this.searchElement.style.marginLeft = "450px";
		this.searchElement.style.width = "463px";
		this.searchElement.placeholder = "Search For names";
		this.popUpContent.appendChild(this.searchElement);

		result.split(',').forEach((item: any,index:number)=>{

		let row = this.tablePopUpContent.insertRow(0);
		this.checkBoxElement = document.createElement("input");
		
		this.checkBoxElement.id = "check";
		this.checkBoxElement.setAttribute("type", "checkbox");

		this.checkBoxElement.addEventListener("change",(event:any) => this.toggleCheckBox.toggleCheck(event,item,popUpService));

		row.appendChild(this.checkBoxElement);
		let cell = row.insertCell(0);
		cell.style.paddingLeft = "10px";
		cell.innerHTML = item;

	})

	let entityName = <HTMLInputElement>document.getElementById("entity");
	 entityName.value = resultSelectedItem

	 this.tablePopUpContent.style.width = "470px";
	 this.tablePopUpContent.style.height = "0px";
	 this.tablePopUpContent.style.backgroundColor = "white";
	 this.tablePopUpContent.style.marginLeft = "450px";
	 this.popUpContent.style.marginTop ="20px";
	 this.popUpContent.style.marginLeft = "10px";
	 this.popUpContent.setAttribute("class","scrollit");
   
    this.popUpContent.appendChild(this.tablePopUpContent);
	
	// ============ our Popup object =============
	let popUpOptions: PopupDev = {
	closeOnOutsideClick: true,
	content:  this.popUpContent,
	name: 'dwcPopup', // unique popup name
	type: 1, // Root popup
	popupStyle: {}
	};
	popUpService = context.factory.getPopupService();
	popUpService.createPopup(popUpOptions);
		}
		
	});

   }catch(e){throw e;}

}
}

export {popUpData}