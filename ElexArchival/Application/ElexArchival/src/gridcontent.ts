import { IInputs } from "../generated/ManifestTypes";
import {Constants} from './constants';
import {serviceCalls} from './servicecalls';

class gridContent extends Constants {
    private api = new serviceCalls();

tableHeaders(_tableElement : HTMLTableElement, container:HTMLDivElement, context:ComponentFramework.Context<IInputs>){
        _tableElement.setAttribute("style","margin-top:10px; align-items:left; margin-left:0px;margin:20px")
		let row = _tableElement.insertRow(0);
		_tableElement.setAttribute("class","tableStyle");
		let cell = row.insertCell(0);
		cell.setAttribute("class","cellStyle");
		let cell1 = row.insertCell(1);
		cell1.setAttribute("class","cellStyle");

		let cell2 = row.insertCell(2);
		cell2.setAttribute("class","cellStyle");

		let cell3 = row.insertCell(3);
		cell3.setAttribute("class","cellStyle");

		let cell4 = row.insertCell(4);
		cell4.setAttribute("class","cellStyle");

		let cell5 = row.insertCell(5);
		cell5.setAttribute("class","cellStyle");

		let cell6 = row.insertCell(6);
		cell6.setAttribute("class","cellStyle");

	 	cell.innerHTML  = "Entity Name";
		cell1.innerHTML = "Logical Name";
		cell2.innerHTML = "Schema Name";
		cell3.innerHTML = "Purge Days";
		cell4.innerHTML = "Archival Days";
		cell5.innerHTML = "FetchNumber";
		cell6.innerHTML = `<input type="button" class="button" id="Addbtn" value="Add">`;
        

		container.appendChild(_tableElement);
        this.ul = document.createElement("ul");
		this.ul.id = "ulList";
		for(let i =1;i<=10;i++){
		   this.li = document.createElement("li");
		  
		   this.li.setAttribute("style","margin:15px;padding:8px;")
		   this.li.id = i.toString();
		   this.li.addEventListener("click",e=>{
			 
			   const input = e.target as HTMLElement;
			   const pageNoClicked = Number(input.innerText);
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
		container.appendChild(this.ul);
		document.getElementById("Addbtn")?.addEventListener("click", Event => window.location.reload());
}


createTableBody(context:ComponentFramework.Context<IInputs>, _tableElement : HTMLTableElement){

     context.webAPI.retrieveMultipleRecords(this.entityElexConfiguration).then( (results: any) =>{

        for (let entity of results.entities) {
            let res_Json = entity['elex_fieldsconfigurationjson'];
            this.result = JSON.parse(res_Json);
            this.result.forEach((element: any , index: number) => {
                let editEntityName = this.result[index]['EntityName'];
                let editLogicalName =  this.result[index]['LogicalName'];
                let editSchemaName =  this.result[index]['SchemaName'];
                let editDateOfPurge =  this.result[index]['DateOfPurge'];
                let editDateOfArchival =  this.result[index]['DateOfArchival'];
                let editFechNo =  this.result[index]['FetchNo'];
                if(editFechNo >=1 && editFechNo <=10){
                let row1 = _tableElement.insertRow(1);
                let cell0 = row1.insertCell(0);
                cell0.innerHTML=editEntityName;
                let cell01 = row1.insertCell(1);
                cell01.innerHTML=editLogicalName;
                let cell02 = row1.insertCell(2);
                cell02.innerHTML=editSchemaName;
                let cell03 = row1.insertCell(3);
                cell03.innerHTML=editDateOfPurge;
                let cell04 = row1.insertCell(4);
                cell04.innerHTML= editDateOfArchival;
                let cell05 = row1.insertCell(5);
                cell05.innerHTML= editFechNo;
                let cell6 = row1.insertCell(6);
                cell6.innerHTML = `<input type="button" class="button" id="editbtn" value="Edit">`;
                document.getElementById("editbtn")?.addEventListener("click", Event => this.api.onEdit(editEntityName,editLogicalName,editSchemaName,editDateOfPurge,editDateOfArchival,editFechNo,context));	
                }
                

            });
        }
    });
    
}
 
showPages(startRecords:Number, endRecords : Number, context:ComponentFramework.Context<IInputs>, _tableElement : HTMLTableElement){	
	let table = <HTMLTableElement>document.getElementById("myTable");
	let rowCount = table.rows.length;
	context.webAPI.retrieveMultipleRecords(this.entityElexConfiguration).then( (results: any) =>{
		try{
		if(results !== null){
			
			if(rowCount === 1){
				this.listUnderPages(startRecords,endRecords,results,_tableElement,context);
				}
				if(rowCount > 1){
					for (let i=rowCount-1; i >=0; i--) {
						if(i>0) {
							table.deleteRow(i);	
						}else{
							this.listUnderPages(startRecords,endRecords,results,_tableElement,context);	
						}
				    }
				}
			}	
	}
		catch(e){
			throw e;
		}	
	});
		
 }	


listUnderPages(startRecords :Number, endRecords:Number, results:any, _tableElement:HTMLTableElement, context:ComponentFramework.Context<IInputs>){
	if(results !== null){
			for (let entity of results.entities) {
						let res_Json = entity['elex_fieldsconfigurationjson'];
						 this.result = JSON.parse(res_Json);
						 this.result.forEach((element: any , index: number) => {
									let editFechNo =  this.result[index]['FetchNo'];
				   	if(editFechNo >= startRecords && editFechNo <= endRecords ){
						let editEntityName = this.result[index]['EntityName'];
						let editLogicalName =  this.result[index]['LogicalName'];
						let editSchemaName =  this.result[index]['SchemaName'];
						let editDateOfPurge =  this.result[index]['DateOfPurge'];
						let editDateOfArchival =  this.result[index]['DateOfArchival'];
							let row1 = _tableElement.insertRow(1);		
							let cell0 = row1.insertCell(0);
							cell0.innerHTML=editEntityName;
							let cell01 = row1.insertCell(1);
							cell01.innerHTML=editLogicalName;
							let cell02 = row1.insertCell(2);
							cell02.innerHTML=editSchemaName;
							let cell03 = row1.insertCell(3);
							cell03.innerHTML=editDateOfPurge;
							let cell04 = row1.insertCell(4);
							cell04.innerHTML= editDateOfArchival;
							let cell05 = row1.insertCell(5);
							cell05.innerHTML= editFechNo;
							let cell6 = row1.insertCell(6);
							cell6.innerHTML = `<input type="button" class="button" id="editbtn" value="Edit">`;
							
							document.getElementById("editbtn")?.addEventListener("click", Event => this.api.onEdit(editEntityName,editLogicalName,editSchemaName,editDateOfPurge,editDateOfArchival,editFechNo,context));	
						}
						
					})
				}
			}
			else{
				let row1 = _tableElement.insertRow(1);		
				let cell0 = row1.insertCell(0);
				cell0.innerHTML="No Records To Display";
			}
		}
}

export {gridContent}