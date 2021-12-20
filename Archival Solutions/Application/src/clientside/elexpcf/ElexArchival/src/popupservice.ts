import { IInputs } from '../generated/ManifestTypes';
import { Constants } from './constants';
import { toggleCheckBox } from './togglecheckbox';

interface PopupDev extends ComponentFramework.FactoryApi.Popup.Popup {
	popupStyle: object;
}
class popUpData extends Constants{

private toggleCheckBox = new toggleCheckBox();


popUpLookUpDetails(context:ComponentFramework.Context<IInputs>, popUpService: ComponentFramework.FactoryApi.Popup.PopupService){
   let result = "", resultSelectedItem =""
   try{
    context.webAPI.retrieveMultipleRecords(this.entityEntity, this.entityFetchXml).then((response)=>{
		if(response!== null){
		for (let ent of response.entities){
		result += ","+ ent[this.entitiesSetName];
		
	    }
		this.popUpContent = document.createElement('div');
		this.tablePopUpContent = document.createElement('table');
		this.tablePopUpContent.id = "popUpTable";

		this.searchElement = document.createElement("input");
		this.searchElement.id = "entitySearch";

		this.searchElement.setAttribute("type","text");
		this.searchElement.style.marginLeft = this.searchElementMarginLeft;
		this.searchElement.style.width = this.searchElementWidth;
		this.searchElement.placeholder = this.popupSearchMessage;
		this.popUpContent.appendChild(this.searchElement);

		result.split(',').forEach((item: string)=>{
		

		let row = this.tablePopUpContent.insertRow(0);
		this.checkBoxElement = document.createElement("input");
		
		this.checkBoxElement.id = "check";
		this.checkBoxElement.setAttribute("type", "checkbox");



		this.checkBoxElement.addEventListener("change",(event) => this.toggleCheckBox.toggleCheck(event, item, popUpService,context));

		row.appendChild(this.checkBoxElement);
		let cell = row.insertCell(0);
		cell.style.paddingLeft = this.checkBoxPaddingLeft;
		cell.innerHTML = item;

	})

	let entityName = <HTMLInputElement>document.getElementById("entity");
	 entityName.value = resultSelectedItem

     this.tablePopUpContent.setAttribute("class","tablePopUpContent");
	 this.popUpContent.style.marginTop =this.popUpContentMarginTop;
	 this.popUpContent.style.marginLeft = this.popUpAndToggleMarginLeft;
	 this.popUpContent.setAttribute("class","scrollit");
   
    this.popUpContent.appendChild(this.tablePopUpContent);
	
	let popUpOptions: PopupDev = {
	closeOnOutsideClick: true,
	content:  this.popUpContent,
	name: this.popUpName, 
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