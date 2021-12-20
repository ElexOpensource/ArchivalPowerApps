class Constants {  

     result: any;
	tableBody: HTMLTableSectionElement;
	_tableElement : HTMLTableElement;
     ul : HTMLUListElement;
     li : HTMLLIElement;

     currPageNumber : number;
     paginationPageNumber : string = "1";
     portalBoolVal : boolean;
  
    
     recentFetchNo : number =0; 
     elexConfigId  : string;
     elexFetchId   : string;
     resultEntityName : string;
     resultFetchXmlbool : boolean = false;

     popUpName = 'searchPopup'
     entitiesSetName ='entitysetname';
     configurationJson = 'elex_fieldsconfigurationjson';
     entityLogicalName = "logicalname";
     entityName = "elex_name";
     entityKey  ="elex_key";
     entityQuery = "elex_query";
     appendFetchXml = "?fetchXml=";
     entityFetchId = "elex_fetchid";
     entityBriefConfigurationId ="elex_briefconfigurationid";

     entityElexFetch : string = "elex_fetch";
     entityElexConfiguration : string ="elex_briefconfiguration";
     entityEntity :string ="entity" //change field name
   
     fetchNoXml : string = "?$select="+this.entityKey+"&$top=1&$orderby="+this.entityKey+"%20desc"
     onEditXml : string = "?$select="+this.entityQuery+"&$filter="+this.entityName+" eq '"
     onUpdateXml : string = "?$select="+this.entityName+"&$filter="+this.entityName+" eq '"
     entityFetchXml = "?fetchXml=<fetch mapping='logical' output-format='xml-platform'><entity name='entity'></entity></fetch>";
     filterFetchXml = "?$select="+this.entityQuery+"&$filter=("+this.entityQuery+" eq '"
     getLogicalNameFromEntity = "?$select=logicalname&$filter="+this.entitiesSetName+" eq '";
     getElexQueries = "?$select="+this.entityQuery+"&$filter=contains("+this.entityName+","+"'" ;
                 

      logicalName :string="";

      popUpContent : HTMLDivElement;
      tablePopUpContent : HTMLTableElement;
      searchElement : HTMLInputElement;
      checkBoxElement : HTMLInputElement;

      archivalAndPurgeDaysLimit = 1826;
      popupSubmitDuplicates    : string = "submitduplicates";
      popupUpdateDuplicates    : string = "updateduplicates";
      popupSearchMessage : string = "Search Entity Name";
      alertMessage       : string = "Enter valid details for ";
      EntityName         : string = "EntityName";
      FetchXml           : string = "FetchXml";
      PurgeDays          : string = "PurgeDays";
      ArchivalDays       : string = "ArchivalDays";
      FetchNumber        : string = "FetchNumber";
      alertMsgFetchNo    : string = "FetchNumber cannot be empty";
      alertArchivalPurge : string = "Cannot be either empty or 0 "; 
      
      resValidFetchXml    : string = "validfetchxml";
      resAllNull          : string = "allnull";
      resSubmit           : string = "onsubmit";
      resAllNullEdit     = "allnulledit";
      resduplicatefetchxml  : string ="duplicatefetchxml";
      resUpdate             : string ="update";
      alertOptions            = { height: 120, width: 260 };
      confirmMessage        : string = "Okay";
      alertSubmitTitle      : string = "Submit Form";
      alertUpdateTitle      : string = "Update Form";
      alertValidFetchxml    : string = "Enter Valid FetchXml"
      alertAllNullSubmit    : string = "Please fill all the details to submit"
      sucessText            : string = "Record Created Successfully";
      
     
      alertAllNullFieldsStrings = {confirmButtonLabel: this.confirmMessage, text: "Please fill all the details to submit", title: this.alertSubmitTitle };
      alertRecordSuccess        = {confirmButtonLabel: this.confirmMessage, text :"Record Created Successfully",title:this.alertSubmitTitle};
      alertduplicatefetchxml    = {confirmButtonLabel: this.confirmMessage, text :"Duplicate fetch xml is not allowed",title:this.alertUpdateTitle};
      alertAllNullEdit          = {confirmButtonLabel:this.confirmMessage,  text:"No new details are provided to update, Change the details to update",title:this.alertUpdateTitle};
      alertEntityName           = {confirmButtonLabel: this.confirmMessage, text :this.alertMessage+this.EntityName,title:this.alertSubmitTitle}
      alertFetchXml             = {confirmButtonLabel: this.confirmMessage, text :this.alertMessage+this.FetchXml,title:this.alertSubmitTitle}
      alertPurgeDays            = {confirmButtonLabel: this.confirmMessage, text :this.alertMessage+this.PurgeDays,title:this.alertSubmitTitle}
      alertArchivalDays         = {confirmButtonLabel: this.confirmMessage, text :this.alertMessage+this.ArchivalDays,title:this.alertSubmitTitle}
      alertSubmitDuplicates     = {confirmButtonLabel: this.confirmMessage, text : "Archival and Purge days cannot be same",title:this.alertSubmitTitle}
      alertUpdateDuplicates     = {confirmButtonLabel: this.confirmMessage, text : "Archival and Purge days cannot be same",title:this.alertUpdateTitle}
      alertRecordUpdate         = {confirmButtonLabel: this.confirmMessage, text :"Record Updated Successfully",title:this.alertUpdateTitle};
      alertSubmitValidFetchXml  = {confirmButtonLabel: this.confirmMessage, text : this.alertValidFetchxml, title: this.alertSubmitTitle};
      alertFetchNumber          = {confirmButtonLabel: this.confirmMessage, text : this.alertMsgFetchNo, title: this.alertSubmitTitle};


      gridEntityName      : string = "EntityName";
      gridLogicalName     : string = "LogicalName";
      gridSchemaName      : string = "SchemaName";
      gridArchivalDays   : string = "DateOfArchival";
      gridPurgeDays       : string = "DateOfPurge";
      gridFetchNumber : string = "FetchNumber";


     
      formEntityID   : string = "entity";
      formLogicalID  : string = "logical";
      formSchemaID   : string = "schema";
      formFetchXmlID : string = "fetchxml";
      formPurgeID    : string = "dateofpurge";
      formArchivalID : string = "dateofarchival";
      formFetchNoID  : string = "fetchno";
      formPortalID   : string = "portalid";


     

      //PopupStyles 
     searchElementMarginLeft = "450px";
     searchElementWidth = "463px";
     checkBoxPaddingLeft = "10px";
     popUpContentMarginTop ="20px";
     popUpAndToggleMarginLeft = "10px";
}  

export{Constants}