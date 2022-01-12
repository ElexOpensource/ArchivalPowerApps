import {IInputs, IOutputs} from "./generated/ManifestTypes";
import {serviceCalls}  from './src/servicecalls';
import{toggleCheckBox} from './src/togglecheckbox';
import {gridContent } from './src/gridcontent';
import {popUpData } from "./src/popupservice"; 
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import  Form  from './src/formhtmlcomponent';



interface PopupDev extends ComponentFramework.FactoryApi.Popup.Popup {
	popupStyle: object;
}
export class ElexArchival implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _context : ComponentFramework.Context<IInputs>;
	private _popUpService: ComponentFramework.FactoryApi.Popup.PopupService;
	private popUpContent : HTMLDivElement;
	private _tableElement : HTMLTableElement;
	private mainContainer : HTMLDivElement;
	private api = new serviceCalls();
    private toggleCheckBox = new toggleCheckBox();
	private gridContent = new gridContent();
	private popUpData = new popUpData();

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{
	
		// Add control initialization code

		//Start Calling React Form
		ReactDOM.render(React.createElement(Form, {
			bundler: "Webpack",
			compiler: "Typescript", 
			framework: "React"
		   }), container);
	//End Calling React Form

	   this._context = context;
	   
		this.popUpData.popUpLookUpDetails(this._context, this._popUpService);

	   //Displaying FetchNo on load of page 
	    this.api.getFetchNumber(context);
	   
	    document.getElementById("btnlookup")?.addEventListener("click", Event=> this.toggleCheckBox.buttonClick(this._popUpService));
		
	    document.getElementById("btnSubmit")?.addEventListener("click", Event => this.api.onSubmit(context));

	  	//START
		this._tableElement = document.createElement('table');
		 
		this._tableElement.id = "myTable";

		this.gridContent.createTableBody(this._context, this._tableElement); 

		this.gridContent.tableHeaders(this._tableElement, container, this._context);
			// ============ our Popup object =============
			let popUpOptions: PopupDev = {
				closeOnOutsideClick: true,
				content:  this.popUpContent,
				name: 'dwcPopup', // unique popup name
				type: 1, // Root popup
				popupStyle: {}
				};
				this._popUpService = context.factory.getPopupService();
				this._popUpService.createPopup(popUpOptions);
				
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
 
}
