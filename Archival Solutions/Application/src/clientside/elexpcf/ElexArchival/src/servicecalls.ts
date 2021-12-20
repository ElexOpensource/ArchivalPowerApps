import { IInputs } from "../generated/ManifestTypes";
import { Constants} from './constants';
import {alertMessages} from './alertmessages';
import { resetForm } from './resetform';

class serviceCalls extends Constants {
    private popUp = new alertMessages();
    private resetForm = new resetForm();

getFetchNumber(context:ComponentFramework.Context<IInputs>)
 	{
	 try{ 
		 context.webAPI.retrieveMultipleRecords(this.entityElexFetch, this.fetchNoXml).then(
			(result) => {
                if(result.entities.length === 0){
                let update_fetchno  = <HTMLInputElement>document.getElementById(this.formFetchNoID);
                update_fetchno.value = (this.recentFetchNo+1).toString();	
            }else
				if(result.entities.values !== null){
					for (let entity of result.entities) {
						this.recentFetchNo = entity[this.entityKey];
						let update_fetchno  = <HTMLInputElement>document.getElementById(this.formFetchNoID);
						update_fetchno.value = (this.recentFetchNo+1).toString();	                       			
				}  	
			  }
			},
			function (error) {
                throw error;
			}
		);
	 }
	 catch(e){ throw e; }	
}


onEdit(entityName:string, logicalName :string, schemaName :string, dateOfPurge:number, dateOfArchival:number, fetchNo:number, context:ComponentFramework.Context<IInputs>){
        this.hideFormOnLoad("Yes",context);
    try{
        let resultantEntityName = entityName+fetchNo;
        let retrieveMultipleOptions = this.onEditXml+resultantEntityName+"' ";
        context.webAPI.retrieveMultipleRecords(this.entityElexFetch, retrieveMultipleOptions).then((response) => {
        
        for(let entity of response.entities){
            let fetchXml =  entity[this.entityQuery];

            let editedEntityName = document.getElementById(this.formEntityID);
            editedEntityName?.focus();
            let resEditedEntityName= <HTMLInputElement>editedEntityName;
            resEditedEntityName.value = entityName;

            let editedLogicalName = document.getElementById(this.formLogicalID);
            let resEditedLogicalName =<HTMLInputElement>editedLogicalName;
            resEditedLogicalName.value = logicalName;

            let editedSchemaName = document.getElementById(this.formSchemaID);
            let resEditedSchemaName =<HTMLInputElement>editedSchemaName;
            resEditedSchemaName.value = schemaName;

            let editedFetchXml = document.getElementById(this.formFetchXmlID);
            let resEditedFetchXml=<HTMLInputElement>editedFetchXml;
            let fetchXmlValue = fetchXml.replace("\\n", '');
            fetchXml =  fetchXmlValue.replace(/\\n/g, '').replace(/\\/g, '').replace(/(^"|"$)/g, '');
            resEditedFetchXml.value = fetchXml;         

            let editedDateOfPurge = document.getElementById(this.formPurgeID);
            let resEditedDateOfPurge =<HTMLInputElement>editedDateOfPurge;
            resEditedDateOfPurge.value = dateOfPurge.toString();

            let editedDateOfArchival = document.getElementById(this.formArchivalID);
            let resEditedDateOfArchival =<HTMLInputElement>editedDateOfArchival;
            resEditedDateOfArchival.value = dateOfArchival.toString();

            let editedFetchNo = document.getElementById(this.formFetchNoID);
            let resEditedFetchNo =<HTMLInputElement>editedFetchNo;
            resEditedFetchNo.value = fetchNo.toString();

            let button = document.getElementById("btnSubmit");
            let resButton = <HTMLInputElement>button;
            resButton.style.display = "none";

            let updateButton = document.getElementById("btnUpdate");
            let resUpdateButton = <HTMLInputElement>updateButton;
            resUpdateButton.style.display = 'block';//To show the hidden button

            let resultantEntityName = resEditedEntityName.value+resEditedFetchNo.value
                
            document.getElementById("btnUpdate")?.addEventListener("click", Event => this.onUpdate(resultantEntityName, context, entityName, fetchXml, dateOfArchival, dateOfPurge));     
            }
         });
    }catch(e) { throw e; }
}


onUpdate(initialEntityName : string, context:ComponentFramework.Context<IInputs>, entityName : string, fetchXml:string, dateOfArchival : number, dateofpurge :number){
    let updtEntityName = <HTMLInputElement>(document.getElementById(this.formEntityID));
    let updtLogicalName = <HTMLInputElement>(document.getElementById(this.formLogicalID));
    let updtSchemaName = <HTMLInputElement>(document.getElementById(this.formSchemaID));
    let updtFetchXml = <HTMLInputElement>(document.getElementById(this.formFetchXmlID));
    let updtDateOfPurge = <HTMLInputElement>(document.getElementById(this.formPurgeID));
    let updtDateOfArchival = <HTMLInputElement>(document.getElementById(this.formArchivalID));
    let updtFetchNo = <HTMLInputElement>(document.getElementById(this.formFetchNoID));
    let dateOfPurgeVal = Number(updtDateOfPurge.value); let dateOfArchivalVal = Number(updtDateOfArchival.value);
  
    if(entityName === updtEntityName.value && fetchXml === updtFetchXml.value && dateofpurge === Number(updtDateOfPurge.value) && dateOfArchival === Number(updtDateOfArchival.value))
    { 
        this.popUp.alertFields(context,this.resAllNullEdit)        
    }
         
    else if(updtDateOfPurge.value === '' || dateOfPurgeVal <0 || dateOfPurgeVal >this.archivalAndPurgeDaysLimit){this.popUp.alertFields(context,"res_date_of_purge");}
    else if(updtDateOfArchival.value === '' || dateOfArchivalVal <0 ||dateOfArchivalVal>this.archivalAndPurgeDaysLimit){this.popUp.alertFields(context,"res_date_of_archival")}
    else if(dateOfPurgeVal === dateOfArchivalVal){ this.popUp.alertFields(context, this.popupUpdateDuplicates)}
      
    else{
        let updatedFetchXml =this.appendFetchXml+ updtFetchXml.value;
        context.webAPI.retrieveMultipleRecords(updtLogicalName.value,updatedFetchXml).then((result)=>{
         
    const res_json =[{
        EntityName  	: updtEntityName.value,
        LogicalName 	: updtLogicalName.value,
        SchemaName  	: updtSchemaName.value,
        // FetchXml    	: updtFetchXml.value,
        DateOfPurge 	: Number(updtDateOfPurge.value),
        DateOfArchival  : Number(updtDateOfArchival.value),
        FetchNumber     : Number(updtFetchNo.value)
    }]
    
    let stringifyJson = JSON.stringify(res_json);
    let resultStringJson = stringifyJson;

    let stringify_fetchxml = JSON.stringify(updtFetchXml.value);
    let elexEntityName = updtEntityName.value+updtFetchNo.value;
    const recordJson = [{ elex_name : elexEntityName, elex_fieldsconfigurationjson :  resultStringJson,elex_isvisibleinportal: this.portalBoolVal }]
    const fetchxml_record_create = [{elex_name: elexEntityName, elex_query : stringify_fetchxml,elex_key: updtFetchNo.value,elex_isvisibleinportal: this.portalBoolVal }]
    let fetchXmlValue = stringify_fetchxml.replace("\\n", '');
    let fetchXmlVal =  fetchXmlValue.replace(/\\n/g, '').replace(/\\/g, '').replace(/(^"|"$)/g, '');
  
    fetchXml = fetchXml.replace(/\\n/g, '').replace(/\\/g, '').replace(/(^"|"$)/g, '');
    if(fetchXml !== updtFetchXml.value){
            let len = 0;
            context.webAPI.retrieveMultipleRecords(this.entityElexFetch,this.getElexQueries+updtEntityName.value +"'"+')').then((response)=>{
                for(let res of response.entities){
                    let fetchxml = res[this.entityQuery];            
                    if(updtFetchXml.value === fetchxml){
                    len += 1;
                    }
                    len;
                }
                    if(len >= 1){
                    this.popUp.alertFields(context,this.resduplicatefetchxml);
                }
          else{
           let retrieveMultipleOptions = this.onUpdateXml+initialEntityName+"' ";
            context.webAPI.retrieveMultipleRecords(this.entityElexFetch, retrieveMultipleOptions).then((response)=>{
                if(response !== null){                  
                      for(let entity of response.entities){
                       this.elexFetchId = entity[this.entityFetchId];
                    
                        context.webAPI.updateRecord(this.entityElexFetch,this.elexFetchId ,fetchxml_record_create).then((response)=>{});
                        this.popUp.alertFields(context,this.resUpdate);
                        this.resetForm.resetArchivalFormFields();
                    }
                }
                
            });
        }
        });  
       
    }
    try{
        if(entityName !== updtEntityName.value || dateofpurge !== Number(updtDateOfPurge.value) || dateOfArchival !== Number(updtDateOfArchival.value))
        {
            let retrieveMultipleOptions = this.onUpdateXml+initialEntityName+"' ";
            context.webAPI.retrieveMultipleRecords(this.entityElexConfiguration, retrieveMultipleOptions).then((response)=>{
                if(response !== null){
                        for(let entity of response.entities) {
                            this.elexConfigId = entity[this.entityBriefConfigurationId];       
                                context.webAPI.updateRecord(this.entityElexConfiguration,this.elexConfigId,recordJson).then((response)=>{
                                    this.popUp.alertFields(context,this.resUpdate);                                    
                                    this.resetForm.resetArchivalFormFields();
                                });            
                        };
                }
            })
        }}catch(e){ throw e; } 
    }).catch(error=>{
                 this.popUp.alertFields(context,this.resValidFetchXml);
                    }); 
    }
}


onSubmit(context:ComponentFramework.Context<IInputs>){

    let portalid = <HTMLInputElement>document.getElementById(this.formPortalID);
    let portalVal = portalid.value;
    
    if(portalVal === "Yes"){this.portalBoolVal = true}else if(portalVal ==="No"){this.portalBoolVal = false}

	let entity = <HTMLInputElement>document.getElementById(this.formEntityID);
	let res_entity_name = entity.value;

	let logical = <HTMLInputElement>document.getElementById(this.formLogicalID);
	let res_logical_name = logical.value;

	let schema = <HTMLInputElement>document.getElementById(this.formSchemaID);
	let res_schema_name = schema.value;

	let fetchxml = <HTMLInputElement>document.getElementById(this.formFetchXmlID);
	let res_fetch_xml= fetchxml.value;


	let dateofpurge = <HTMLInputElement>document.getElementById(this.formPurgeID);
	let res_date_of_purge = dateofpurge.value;


	let dateofarchival = <HTMLInputElement>document.getElementById(this.formArchivalID);
	let res_date_of_archival = dateofarchival.value;

	let fetchno = <HTMLInputElement>document.getElementById(this.formFetchNoID);
	let res_fetch_no = fetchno.value;
  
    
        context.webAPI.retrieveMultipleRecords(this.entityElexFetch,this.getElexQueries +res_entity_name +"'"+')').then((response)=>{
            let len = 0;
            for(let res of response.entities){
                let fetchxml = res[this.entityQuery];            
                if(res_fetch_xml === fetchxml){
                len += 1;
                }
                len;
            }
                if(len >= 1){
                this.popUp.alertFields(context,this.resduplicatefetchxml);
            }
            
        else {
              
    if(res_entity_name !== ''  ||  res_date_of_archival !== '' || res_date_of_purge !== '' || res_fetch_xml !== ''){

    if( res_fetch_no === ''){this.popUp.alertFields(context,"res_fetch_no")}else
	//JSON FORMATION 
     if(res_entity_name === '')
     {this.popUp.alertFields(context,"res_entity_name")}
     else if(res_fetch_xml === '' ){this.popUp.alertFields(context,"res_fetch_xml")}
     else if(res_date_of_purge === '' || Number(res_date_of_purge) < 0 || Number(res_date_of_purge) > this.archivalAndPurgeDaysLimit){  this.popUp.alertFields(context,"res_date_of_purge"); }
     else if(res_date_of_archival === '' || Number(res_date_of_archival) < 0 || Number(res_date_of_archival) > this.archivalAndPurgeDaysLimit){this.popUp.alertFields(context,"res_date_of_archival")}
     else if(res_date_of_purge === res_date_of_archival){ this.popUp.alertFields(context,this.popupSubmitDuplicates)}
     else if(res_fetch_xml != ''){
        let fetchXml = this.appendFetchXml+ res_fetch_xml;
        context.webAPI.retrieveMultipleRecords(res_logical_name,fetchXml).then((result)=>{
          
    const res_json =[{
		EntityName 		 : res_entity_name,
		LogicalName 	 : res_logical_name,
		SchemaName   	 : res_schema_name,
		DateOfPurge 	 : Number(res_date_of_purge),
		DateOfArchival   : Number(res_date_of_archival),
		FetchNumber      : Number(res_fetch_no)
	}]
    let stringify_json = JSON.stringify(res_json);

	let stringify_fetchxml = JSON.stringify(res_fetch_xml);  
	//JSON FORMATION END
	
	//Create Records under brief_Configurations
	const record_json = [{ elex_name : res_entity_name+res_fetch_no, elex_fieldsconfigurationjson :  stringify_json, elex_isvisibleinportal: this.portalBoolVal }]
	 
	try{
      
	context.webAPI.createRecord(this.entityElexConfiguration, record_json).then(
		function success(result) {},               
		function (error) {
            throw error;	
        	}
	);
	}catch(e){ throw e; }

    const fetchxml_record_create = [{elex_name: res_entity_name+res_fetch_no, elex_query : JSON.parse(stringify_fetchxml), elex_key: res_fetch_no,elex_isvisibleinportal: this.portalBoolVal}]
	
    context.webAPI.createRecord(this.entityElexFetch, fetchxml_record_create).then(
        (response)=>{
            this.popUp.alertFields(context,this.resSubmit);
        });
	
}).catch(error=>{
        this.popUp.alertFields(context,this.resValidFetchXml);
          });

} }
	else{     
        this.popUp.alertFields(context,this.resAllNull);
	}
  }
}); }


validateFetchXml(context:ComponentFramework.Context<IInputs>){
    let updtFetchXml = <HTMLInputElement>(document.getElementById(this.formFetchXmlID));
    let updtEntityName = <HTMLInputElement>(document.getElementById(this.formEntityID));
    let updtLogicalName = <HTMLInputElement>(document.getElementById(this.formLogicalID));


    let len = 0;
    context.webAPI.retrieveMultipleRecords(this.entityElexFetch,this.getElexQueries+updtEntityName.value +"'"+')').then((response)=>{
        for(let res of response.entities){
            let fetchxml = res[this.entityQuery];            
            if(updtFetchXml.value === fetchxml){
            len += 1;
            }
            len;
        }
            if(len >= 1){
            this.popUp.alertFields(context,this.resduplicatefetchxml);
            }else{
            try{ 
                let fetchXml = this.appendFetchXml+ updtFetchXml.value;
                context.webAPI.retrieveMultipleRecords(updtLogicalName.value,fetchXml).then((result)=>{
                
                    }).catch(error =>{
                        this.popUp.alertFields(context,this.resValidFetchXml); })
              
                }catch(error){throw error;}
            }
        }).catch(error=>{
            this.popUp.alertFields(context,this.resValidFetchXml);
        })
 }
  
 hideFormOnLoad(display : string,context:ComponentFramework.Context<IInputs>){

   let submitButton = <HTMLInputElement>document.getElementById("btnSubmit");
   let updateButton = <HTMLInputElement>document.getElementById("btnUpdate");
   let hide = <HTMLInputElement>document.getElementById("reset-form");
   if(display === "Yes"){
       hide.style.display = "block";
       this.resetForm.resetArchivalFormFields();
       submitButton.style.display = "block";
       updateButton.style.display = "none";
       this.getFetchNumber(context);
   }
   else if(display === "No"){
   hide.style.display = "none";
   }
 }
}

export {serviceCalls};


   
