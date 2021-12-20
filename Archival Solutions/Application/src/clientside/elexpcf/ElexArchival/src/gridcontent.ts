import { IInputs } from "../generated/ManifestTypes";
import {Constants} from './constants';
import {serviceCalls} from './servicecalls';
import {resetForm} from './resetform';

class gridContent extends Constants {
    private api = new serviceCalls();
	private resetForm = new resetForm();
tableHeaders(_tableElement : HTMLTableElement, container:HTMLDivElement, context:ComponentFramework.Context<IInputs>){
        _tableElement.setAttribute("class","headerStyling")
		let header = _tableElement.insertRow(0);
		_tableElement.setAttribute("class","tableStyle");
		let headerEntityName = header.insertCell(0);
		headerEntityName.setAttribute("class","cellStyle");

		let headerPurgeDays = header.insertCell(1);
		headerPurgeDays.setAttribute("class","cellStyle");

		let headerArchivalDays = header.insertCell(2);
		headerArchivalDays.setAttribute("class","cellStyle");

		let headerFetchNumber = header.insertCell(3);
		headerFetchNumber.setAttribute("class","cellStyle");

		let headerAddButton = header.insertCell(4);
		headerAddButton.setAttribute("class","cellStyle");

		headerEntityName.innerHTML  = "Entity Name";
		headerPurgeDays.innerHTML = "Purge Days";
		headerArchivalDays.innerHTML = "Archival Days";
		headerFetchNumber.innerHTML = "FetchNumber";
		headerAddButton.innerHTML = `<input type="button" class="button" id="Addbtn" value="Add">`;
        

		container.appendChild(_tableElement);
        this.ul = document.createElement("ul");
		this.ul.id = "ulList";

		 let left = document.createElement("li");
		    
		 left.setAttribute("class","paginationLeftRight")
		 left.id = "leftArrow";		 
		 left.addEventListener("click",e=>{   
			let number = <HTMLElement>document.getElementById("1");
				if(this.paginationPageNumber === "1"){}else{
			number.innerText = (Number(this.paginationPageNumber)-1).toString();
			this.paginationPageNumber = (Number(number.innerText)).toString();

		 this.currPageNumber = Number(this.paginationPageNumber);;
		 let startRecords : number ; let  endRecords :number;
		 if (this.currPageNumber === 1){ startRecords = this.currPageNumber; endRecords = 10}
		 else{ 
			  startRecords = this.currPageNumber*10-10; 
				 endRecords = startRecords+10;
			 }	
		 this.showPages(startRecords,endRecords,context,_tableElement)
			}
		 });
		 left.innerText = "<<";
		 this.ul.appendChild(left);

		for(let i =1;i<=1;i++){
		   this.li = document.createElement("li");
		   
		   this.li.setAttribute("class","paginationLeftRight")
		   this.li.id = i.toString();
		   this.li.addEventListener("click",e=>{
		
			   const input = e.target as HTMLElement;
			   const pageNoClicked = Number(input.innerText);
			   this.currPageNumber = pageNoClicked;
			   let startRecords : number ; let  endRecords :number;
			   if (pageNoClicked === 1){ startRecords = pageNoClicked; endRecords = 10}
			   else{ 
				    startRecords = pageNoClicked*10-10; 
			   		endRecords = startRecords+10;
				   }		
			this.showPages(startRecords,endRecords,context,_tableElement)
					
		   });
		   this.li.innerText = i.toString();
		   this.ul.appendChild(this.li)
		}

		let right = document.createElement("li");
		    
		right.setAttribute("class","paginationLeftRight")
		right.id = "rightArrow";
		right.addEventListener("click",e=>{   

			let number = <HTMLElement>document.getElementById("1");
			number.innerText = (Number(this.paginationPageNumber)+1).toString();
			this.paginationPageNumber = (Number(number.innerText)).toString();

			this.currPageNumber = Number(this.paginationPageNumber);
			let startRecords : number ; let  endRecords :number;
			if (this.currPageNumber === 1){ startRecords = this.currPageNumber; endRecords = 10}
			else{ 
				    startRecords = this.currPageNumber*10-10; 
					endRecords = startRecords+10;
				}	
			this.showPages(startRecords,endRecords,context,_tableElement)
				   
			});
			right.innerText = ">>";
		this.ul.appendChild(right);

		container.appendChild(this.ul);
		document.getElementById("Addbtn")?.addEventListener("click", Event => this.api.hideFormOnLoad("Yes",context));
}


createTableBody(context:ComponentFramework.Context<IInputs>, _tableElement : HTMLTableElement){

     context.webAPI.retrieveMultipleRecords(this.entityElexConfiguration).then((results: ComponentFramework.WebApi.RetrieveMultipleResponse) =>{
	if(results !== null){
        for (let entity of results.entities) {
            let res_Json = entity[this.configurationJson];
            this.result = JSON.parse(res_Json);
            this.result.forEach((element: object , index: number) => {
                let editEntityName = this.result[index][this.gridEntityName];
                let editLogicalName =  this.result[index][this.gridLogicalName];
                let editSchemaName =  this.result[index][this.gridSchemaName];
                let editDateOfPurge =  this.result[index][this.gridPurgeDays];
                let editDateOfArchival =  this.result[index][this.gridArchivalDays];
                let editFechNo =  this.result[index][this.gridFetchNumber];
                if(editFechNo >=1 && editFechNo <=10){
                let gridRow = _tableElement.insertRow(1);
                let cellEntityName = gridRow.insertCell(0);
                cellEntityName.innerHTML=editEntityName;
                let cellPurgeDays = gridRow.insertCell(1);
                cellPurgeDays.innerHTML=editDateOfPurge;
                let cellArchivalDays = gridRow.insertCell(2);
                cellArchivalDays.innerHTML= editDateOfArchival;
                let cellFetchNumber = gridRow.insertCell(3);
                cellFetchNumber.innerHTML= editFechNo;
                let cellEditButton = gridRow.insertCell(4);
                cellEditButton.innerHTML = `<input type="button" class="button" id="editbtn" value="Edit">`;
                document.getElementById("editbtn")?.addEventListener("click", Event => this.api.onEdit(editEntityName, editLogicalName, editSchemaName, editDateOfPurge, editDateOfArchival, editFechNo, context));	
				}             
            });
        }
	  }
    });
}
 

showPages(startRecords:Number,endRecords : Number, context:ComponentFramework.Context<IInputs>, _tableElement : HTMLTableElement){	
	let table = <HTMLTableElement>document.getElementById("myTable");
	let rowCount = table.rows.length;
	context.webAPI.retrieveMultipleRecords(this.entityElexConfiguration).then( (results:ComponentFramework.WebApi.RetrieveMultipleResponse) =>{
		try{
		if(results !== null){
			
			if(rowCount === 1){
				
				this.listUnderPages(startRecords, endRecords, results, _tableElement, context);
				}
				if(rowCount > 1){
					for (let i=rowCount-1; i >=0; i--) {
						if(i>0) {
							table.deleteRow(i);	
						}else{
							this.listUnderPages(startRecords, endRecords, results, _tableElement, context);	
						}
				    }
				}
			}	
	}
		catch(e){throw e;}	
	});
		
 }	
listUnderPages(startRecords :Number, endRecords:Number, results:ComponentFramework.WebApi.RetrieveMultipleResponse, _tableElement:HTMLTableElement, context:ComponentFramework.Context<IInputs>){
	if(results !== null){ 
			for (let entity of results.entities) {
						let res_Json = entity[this.configurationJson];
						 this.result = JSON.parse(res_Json);
						 this.result.forEach((element:object, index: number) => {
									var editFechNo =  this.result[index][this.gridFetchNumber];
				   	if(editFechNo >= startRecords && editFechNo <= endRecords ){
						let editEntityName = this.result[index][this.gridEntityName];
						let editLogicalName =  this.result[index][this.gridLogicalName];
						let editSchemaName =  this.result[index][this.gridSchemaName];
						let editDateOfPurge =  this.result[index][this.gridPurgeDays];
						let editDateOfArchival =  this.result[index][this.gridArchivalDays];
							let gridRow = _tableElement.insertRow(1);		
							let cellEntityName = gridRow.insertCell(0);
							cellEntityName.innerHTML=editEntityName;
							let cellPurgeDays = gridRow.insertCell(1);
							cellPurgeDays.innerHTML=editDateOfPurge;
							let cellArchivalDays = gridRow.insertCell(2);
							cellArchivalDays.innerHTML= editDateOfArchival;
							let cellFetchNumber = gridRow.insertCell(3);
							cellFetchNumber.innerHTML= editFechNo;
							let cellEditButton = gridRow.insertCell(4);
							cellEditButton.innerHTML = `<input type="button" class="button" id="editbtn" value="Edit">`;
							
							document.getElementById("editbtn")?.addEventListener("click", Event => this.api.onEdit(editEntityName,editLogicalName,editSchemaName,editDateOfPurge,editDateOfArchival,editFechNo,context));	
						}						
					})
				}
			}
		}
}

export {gridContent}