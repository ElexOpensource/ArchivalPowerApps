import { IInputs } from "../generated/ManifestTypes";

class Constants {  
    _context : ComponentFramework.Context<IInputs>;
     //Start Grid Headers
     result: any;
	tableBody: HTMLTableSectionElement;
	_tableElement : HTMLTableElement;
     ul : HTMLUListElement;
     li : HTMLLIElement;
     //End Grid Headers
    
     recentFetchNo : number =0;//Initializing FetchNumber to increase with the latest records 
     elexConfigId  : string;
     elexFetchId   : string;
     resultEntityName : string;
     resultFetchXmlbool : boolean = false;

     //START EntityNames to Make a Service Calls
     entityElexFetch : string = "elex_fetch";
     entityElexConfiguration : string ="elex_briefconfiguration";
     entityEntity :string ="entity"
     //END EntityNames to Make a Service Calls

     //FetchXml Constants
     fetchNoXml : string = "?$select=elex_key&$top=1&$orderby=elex_key%20desc"
     onEditXml : string = "?$select=elex_query&$filter=elex_name eq '"
     onUpdateXml : string = "?$select=elex_name&$filter=elex_name eq '"
     entityFetchXml = "?fetchXml=<fetch mapping='logical' output-format='xml-platform' version='1.0'><entity name='entity'></entity></fetch>";
     filterFetchXml = "?$select=elex_query&$filter=(elex_query eq '"
     //FetchXml Constants


      popUpContent : HTMLDivElement;
      tablePopUpContent : HTMLTableElement;
      searchElement : HTMLInputElement;
      checkBoxElement : HTMLInputElement;

      alertMessage       : string = "Enter valid details for ";
      EntityName    : string = "EntityName";
      FetchXml      : string = "FetchXml";
      PurgeDays     : string = "PurgeDays";
      ArchivalDays  : string = "ArchivalDays";
      alertFetchNumber   : string = "FetchNumber";
      alertMsgFetchNo    : string = this.alertFetchNumber +"Cannot be empty";
      alertArchivalPurge : string = "Cannot be either empty or 0 "; 
      
      resAllNull : string = "allnull";
      resSubmit  : string = "submit";
      resAllNullEdit = "allnulledit";
      resduplicatefetchxml  : string ="duplicatefetchxml";
      resUpdate : string ="update";
      alertOptions = { height: 120, width: 260 };
      confirmMessage       : string = "Okay";
      alertSubmitTitle     : string = "Submit Form";
      alertUpdateTitle     : string = "Update Form";
      alertAllNullSubmit   : string = "Please fill all the details to submit!..."
      sucessText           : string = "Record Created Successfully!...";
      alertAllNullFieldsStrings = {confirmButtonLabel: this.confirmMessage, text: "Please fill all the details to submit!...", title: this.alertSubmitTitle };
      alertRecordSuccess        = {confirmButtonLabel: this.confirmMessage, text :"Record Created Successfully!...",title:this.alertSubmitTitle};
      alertduplicatefetchxml    = {confirmButtonLabel: this.confirmMessage, text :"Duplicate fetch xml is not allowed !...",title:this.alertUpdateTitle};
      alertAllNullEdit          = {confirmButtonLabel:this.confirmMessage,  text:"No new details are provided to update !... Change the details to update",title:this.alertUpdateTitle};
      alertEntityName           = {confirmButtonLabel: this.confirmMessage, text :this.alertMessage+this.EntityName,title:this.alertSubmitTitle}
      alertFetchXml             = {confirmButtonLabel: this.confirmMessage, text :this.alertMessage+this.FetchXml,title:this.alertSubmitTitle}
      alertPurgeDays            = {confirmButtonLabel: this.confirmMessage, text :this.alertMessage+this.PurgeDays,title:this.alertSubmitTitle}
      alertArchivalDays         = {confirmButtonLabel: this.confirmMessage, text :this.alertMessage+this.ArchivalDays,title:this.alertSubmitTitle}
    
     
}  

export{Constants}