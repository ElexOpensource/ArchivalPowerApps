import { IInputs } from "../generated/ManifestTypes";
import {Constants} from './constants';
import {alertMessages} from './alertmessages';

let length : number;

class serviceCalls extends Constants{
    private alerts = new alertMessages();

//Getting FetchNo and displaying on page initialization
getFetchNumber(context:ComponentFramework.Context<IInputs>)
 	{
	 try{ 
		 context.webAPI.retrieveMultipleRecords(this.entityElexFetch, this.fetchNoXml).then(
			(result) => {
				if(result.entities.values !== null){
					for (let entity of result.entities) {
						this.recentFetchNo = entity["elex_key"];
						let update_fetchno  = <HTMLInputElement>document.getElementById("fetchno");
						update_fetchno.value = (this.recentFetchNo+1).toString();	                       			
				}    			
			  }else{
                let update_fetchno  = <HTMLInputElement>document.getElementById("fetchno");
                update_fetchno.value = (this.recentFetchNo+1).toString();		
              }
			},
			function (error) {
                throw error;
			}
		);
	 }
	 catch(e){
		 throw e;
	 }
	
    }
//End Get Fetch No

//Start Edit 
onEdit(entityName:string, logicalName :string, schemaName :string, dateOfPurge:number, dateOfArchival:number, fetchNo:number, context:ComponentFramework.Context<IInputs>){

    try{
        let resultantEntityName = entityName+fetchNo;
        let retrieveMultipleOptions = this.onEditXml+resultantEntityName+"' ";
        context.webAPI.retrieveMultipleRecords(this.entityElexFetch, retrieveMultipleOptions).then((response: any) => {
        
        for(let entity of response.entities){
            let elexQuery =  entity['elex_query'];
            let fetchXml = JSON.stringify(elexQuery);

            let editedEntityName = document.getElementById("entity");
            editedEntityName?.focus();
            let resEditedEntityName= <HTMLInputElement>editedEntityName;
            resEditedEntityName.value = entityName;

            let editedLogicalName = document.getElementById("logical");
            let resEditedLogicalName =<HTMLInputElement>editedLogicalName;
            resEditedLogicalName.value = logicalName;

            let editedSchemaName = document.getElementById("schema");
            let resEditedSchemaName =<HTMLInputElement>editedSchemaName;
            resEditedSchemaName.value = schemaName;

            let editedFetchXml = document.getElementById("fetchxml");
            let resEditedFetchXml=<HTMLInputElement>editedFetchXml;
            resEditedFetchXml.value = fetchXml;

            let editedDateOfPurge = document.getElementById("dateofpurge");
            let resEditedDateOfPurge =<HTMLInputElement>editedDateOfPurge;
            resEditedDateOfPurge.value = dateOfPurge.toString();

            let editedDateOfArchival = document.getElementById("dateofarchival");
            let resEditedDateOfArchival =<HTMLInputElement>editedDateOfArchival;
            resEditedDateOfArchival.value = dateOfArchival.toString();

            let editedFetchNo = document.getElementById("fetchno");
            let resEditedFetchNo =<HTMLInputElement>editedFetchNo;
            resEditedFetchNo.value = fetchNo.toString();

                let button = document.getElementById("btnSubmit");
                let resButton = <HTMLInputElement>button;
                resButton.style.display = "none";

                let updateButton = document.getElementById("btnupdate");
                let resUpdateButton = <HTMLInputElement>updateButton;
                resUpdateButton.style.display = 'block';//To show the hidden button

                let resultantEntityName = resEditedEntityName.value+resEditedFetchNo.value
                
                document.getElementById("btnupdate")?.addEventListener("click", Event => this.onUpdate(resultantEntityName,context,entityName,fetchXml,dateOfArchival,dateOfPurge));
                
                }
         });
   
    }catch(e)
    {
        throw e;
    }
}
//End Edit

//Start Update

onUpdate(initialEntityName : string, context:ComponentFramework.Context<IInputs>, entityName : string, fetchXml:string,dateOfArchival : number, dateofpurge :number){
    //GetUpdated Values 
    let updtEntityName = <HTMLInputElement>(document.getElementById("entity"));
    let updtLogicalName = <HTMLInputElement>(document.getElementById("logical"));
    let updtSchemaName = <HTMLInputElement>(document.getElementById("schema"));
    let updtFetchXml = <HTMLInputElement>(document.getElementById("fetchxml"));
    let updtDateOfPurge = <HTMLInputElement>(document.getElementById("dateofpurge"));
    let updtDateOfArchival = <HTMLInputElement>(document.getElementById("dateofarchival"));
    let updtFetchNo = <HTMLInputElement>(document.getElementById("fetchno"));
    if(entityName === updtEntityName.value && fetchXml === updtFetchXml.value && dateofpurge === Number(updtDateOfPurge.value) && dateOfArchival === Number(updtDateOfArchival.value))
    { 
        this.alerts.alertFields(context,this.resAllNullEdit)
        
    }
    else{
        
    const res_json =[{
        EntityName  	: updtEntityName.value,
        LogicalName 	: updtLogicalName.value,
        SchemaName  	: updtSchemaName.value,
        FetchXml    	: updtFetchXml.value,
        DateOfPurge 	: Number(updtDateOfPurge.value),
        DateOfArchival  : Number(updtDateOfArchival.value),
        FetchNo         : Number(updtFetchNo.value)
    }]
    
    let stringifyJson = JSON.stringify(res_json);
    let resultStringJson = stringifyJson;

    let stringify_fetchxml = JSON.stringify(updtFetchXml.value);
    let elexEntityName = updtEntityName.value+updtFetchNo.value;
    const recordJson = [{ elex_name : elexEntityName, elex_fieldsconfigurationjson :  resultStringJson }]
    const fetchxml_record_create = [{elex_name: elexEntityName, elex_query : stringify_fetchxml,elex_key: updtFetchNo.value }]
//WEBAPI START Get FetchID to update FetchXml
        if(fetchXml !== updtFetchXml.value){
           let retrieveMultipleOptions = this.onUpdateXml+initialEntityName+"' ";
            context.webAPI.retrieveMultipleRecords(this.entityElexFetch, retrieveMultipleOptions).then((response)=>{
                if(response !== null){                  
                      for(let entity of response.entities){
                       this.elexFetchId = entity['elex_fetchid'];
                    
                        context.webAPI.updateRecord(this.entityElexFetch,this.elexFetchId ,fetchxml_record_create).then((response)=>{});
                        this.alerts.alertFields(context,this.resUpdate);
                       
                    }
                }
                
            });
        }
//WEBAPI END Get FetchID to update FetchXml
    try{
        if(entityName !== updtEntityName.value || dateofpurge !== Number(updtDateOfPurge.value) || dateOfArchival !== Number(updtDateOfArchival.value))
        {
            let retrieveMultipleOptions = this.onUpdateXml+initialEntityName+"' ";
            context.webAPI.retrieveMultipleRecords(this.entityElexConfiguration, retrieveMultipleOptions).then((response)=>{
                if(response !== null){
                        for(let entity of response.entities) {
                            this.elexConfigId = entity['elex_briefconfigurationid'];       
                                context.webAPI.updateRecord(this.entityElexConfiguration,this.elexConfigId,recordJson).then((response)=>{
                                    alert("Record updated successfully! ");
                                    window.location.reload();
                                })
                             
                        };
                }
            })
        }
        
        }catch(e){throw e;}
//WEBAPI END Get configurationid to update json
        }
    }
//End Update


onSubmit(context:ComponentFramework.Context<IInputs>){

	let entity = <HTMLInputElement>document.getElementById("entity");
	let res_entity_name = entity.value;

	let logical = <HTMLInputElement>document.getElementById("logical");
	let res_logical_name = logical.value;

	let schema = <HTMLInputElement>document.getElementById("schema");
	let res_schema_name = schema.value;

	let fetchxml = <HTMLInputElement>document.getElementById("fetchxml");
	let res_fetch_xml= fetchxml.value;


	let dateofpurge = <HTMLInputElement>document.getElementById("dateofpurge");
	let res_date_of_purge = dateofpurge.value;


	let dateofarchival = <HTMLInputElement>document.getElementById("dateofarchival");
	let res_date_of_archival = dateofarchival.value;

	let fetchno = <HTMLInputElement>document.getElementById("fetchno");
	let res_fetch_no = fetchno.value;
    let fetchNumber = Number(res_fetch_no);

    context.webAPI.retrieveMultipleRecords("elex_fetch",this.filterFetchXml+res_fetch_xml+"' and contains(elex_name,  '"+res_entity_name+"'))").then((response : any)=>{
        length = response.entities.length;
        if(length > 0){
            this.alerts.alertFields(context,this.resduplicatefetchxml)
        } 
        else {
              
    if(res_entity_name !== ''  ||  res_date_of_archival !== '' || res_date_of_purge !== '' || res_fetch_xml !== ''){
      
    if( res_fetch_no === ''){this.fieldAlertMessages("res_fetch_no")}else
	//JSON FORMATION 
     if(res_entity_name === '')
     {this.alerts.alertFields(context,"res_entity_name")}
     else if(res_fetch_xml === '' ){this.alerts.alertFields(context,"res_fetch_xml")}
     else if(res_date_of_purge === '' || Number(res_date_of_purge) <= 0){  this.alerts.alertFields(context,"res_date_of_purge"); }
     else if(res_date_of_archival === '' || Number(res_date_of_archival) <= 0){this.alerts.alertFields(context,"res_date_of_archival")}

     else{
        
    const res_json =[{
		EntityName 		 : res_entity_name,
		LogicalName 	 : res_logical_name,
		SchemaName   	 : res_schema_name,
		DateOfPurge 	 : res_date_of_purge,
		DateOfArchival   : res_date_of_archival,
		FetchNo          : Number(res_fetch_no)
	}]
	var stringify_json = JSON.stringify(res_json);

	var stringify_fetchxml = JSON.stringify(res_fetch_xml);  
	//JSON FORMATION END
	
	//Create Records under brief_Configurations
	const record_json = [{ elex_name : res_entity_name+res_fetch_no, elex_fieldsconfigurationjson :  stringify_json }]
	 
	try{
		
	context.webAPI.createRecord(this.entityElexConfiguration, record_json).then(
		function success(result) {},               
		function (error) {
            throw error;	
        	}
	);
	}catch(e){throw e;}
	//Create Records under Configurable_Queries
	const fetchxml_record_create = [{elex_name: res_entity_name+res_fetch_no, elex_query : JSON.parse(stringify_fetchxml),elex_key: res_fetch_no }]
	
    context.webAPI.createRecord(this.entityElexFetch, fetchxml_record_create).then(
        (response : any)=>{
            this.alerts.alertFields(context,this.resSubmit);
        });
	}
}

	else{
        
        this.alerts.alertFields(context,this.resAllNull);  
    	}
    }
  });
}
 
fieldAlertMessages(fieldName: string) {

    switch (fieldName){
        case "res_entity_name"      : alert(this.alertMessage + this.EntityName); break;
        case "res_date_of_purge"    : alert(this.alertArchivalPurge + this.alertPurgeDays);  break;
        case "res_date_of_archival" : alert(this.alertArchivalPurge + this.alertArchivalDays); break;
        case "res_fetch_xml"        : alert(this.alertMessage + this.alertFetchXml); break;
        case  "res_fetch_no"        : alert(this.alertMessage + this.alertMsgFetchNo); break;
        case "default"              : break;
    }
}


 getFetchXmlRecords(fetchXml : string,context:ComponentFramework.Context<IInputs>, entityName :string){
       context.webAPI.retrieveMultipleRecords(this.entityElexFetch,this.filterFetchXml+fetchXml+"' and contains(elex_name,  '"+entityName+"'))").then((response : any)=>{
       length = response.entities.length;
       return length;
    });

}



   
}


export {serviceCalls};