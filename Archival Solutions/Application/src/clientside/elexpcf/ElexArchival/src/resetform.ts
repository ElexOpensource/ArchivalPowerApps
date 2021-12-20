import { Constants } from "./constants";

class resetForm extends Constants {

    resetArchivalFormFields(){
        //entityName: HTMLInputElement, logicalName:HTMLInputElement, schemaName:HTMLInputElement, fetchXml:HTMLInputElement, archivalDays:HTMLInputElement, purgeDays: HTMLInputElement){
        let entityName = <HTMLInputElement>document.getElementById(this.formEntityID);
        entityName.value   = '';
        let logicalName = <HTMLInputElement>document.getElementById(this.formLogicalID);
        logicalName.value  = '';
        let schemaName = <HTMLInputElement>document.getElementById(this.formSchemaID);
        schemaName.value   = '';
        let fetchXml = <HTMLInputElement>document.getElementById(this.formFetchXmlID);
        fetchXml.value     = '';
        let archivalDays = <HTMLInputElement>document.getElementById(this.formArchivalID);
        archivalDays.value = '';
        let purgeDays = <HTMLInputElement>document.getElementById(this.formPurgeID);
        purgeDays.value    = '';
        
        this.focusOnEntityName(entityName);
    }

    focusOnEntityName(entityName: HTMLInputElement){
        entityName.focus();
    }
}

export{resetForm}