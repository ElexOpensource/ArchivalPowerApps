import { IInputs } from "../generated/ManifestTypes";
import { Constants } from "./constants";

class alertMessages extends Constants{
    alertFields(context:ComponentFramework.Context<IInputs>, alertType : string ){ 
        if(alertType !== null){
        switch(alertType){
            case "nullcheck": 
                this.openAlerts(context,this.alertAllNullFieldsStrings); break;
            case "onsubmit":
                this.openAlerts(context,this.alertRecordSuccess); break;
            case "duplicatefetchxml":
                this.openAlerts(context,this.alertduplicatefetchxml); break;
            case "res_entity_name":
                this.openAlerts(context,this.alertEntityName); break;
            case "res_fetch_xml":
                this.openAlerts(context,this.alertFetchXml); break;
            case "res_date_of_purge":
                this.openAlerts(context,this.alertPurgeDays); break;
            case "res_date_of_archival":
                this.openAlerts(context,this.alertArchivalDays); break;
            case "allnulledit":
                this.openAlerts(context,this.alertAllNullEdit); break;
            case "submitduplicates":
                this.openAlerts(context,this.alertSubmitDuplicates); break;
            case "updateduplicates":
                this.openAlerts(context,this.alertUpdateDuplicates);break;
            case "update": 
                this.openAlerts(context,this.alertRecordUpdate); break;
            case "validfetchxml":
                this.openAlerts(context,this.alertSubmitValidFetchXml);break;
            case "res_fetch_no" :
                this.openAlerts(context,this.alertFetchNumber);break;

            default : break;
        }   
      }
    }


    openAlerts(context:ComponentFramework.Context<IInputs>, alertString: ComponentFramework.NavigationApi.AlertDialogStrings){
        context.navigation.openAlertDialog(alertString,this.alertOptions).then(
             (success) => { 
                if(alertString.text === this.sucessText){
                    window.location.reload();
                }
             },
            function (error) {
                 throw error;
            });
    }
}

export {alertMessages}


