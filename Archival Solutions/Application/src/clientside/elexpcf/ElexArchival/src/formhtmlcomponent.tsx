// eslint-disable-next-line no-use-before-define
import * as React from 'react'

export default function Form () {
	
	  
return (
	
<form id="reset-form">
		
<div className="form-group">
	<div className="form-col-4">
		<label className ="labelStyling">Entity Name</label>
	</div>
	<div className="form-col-8">
    <div className="iptWithSearch">
		<input className = "inputStyling inputParent"  type="text" id="entity" placeholder="Entity Name" readOnly ={true}/>
		<input type="button" className="button inputSearchButton" id="btnlookup" value="Search"/>
    </div>
	</div>
</div>
<div className ="form-group">
<div className="form-col-4">
		<label className ="labelStyling">Logical Name</label>
	</div>
	<div className="form-col-8">
		<input className = "inputStyling"  type="text" id="logical" placeholder="Logical Name" readOnly ={true}/>
	</div>
</div>
<div className ="form-group">
<div className="form-col-4">
		<label className ="labelStyling">Schema Name</label>
	</div>
	<div className="form-col-8">
		<input className = "inputStyling"  type="text" id="schema" placeholder="Schema Name" readOnly ={true}/>
	</div>
</div>
<div className ="form-group">
<div className="form-col-4">
		<label className ="labelStyling">FetchXml</label>
	</div>
	<div className="form-col-8">
	<textarea className ="textAreaStyling" rows={4} cols={5} id = "fetchxml" placeholder="Fetch XML" /><br/>
	</div>
</div>

<div className ="form-group">
<div className="form-col-4">
		<label className ="labelStyling">Purge Days</label>
	</div>
	<div className="form-col-8">
		<input className = "inputStyling"  type="number" id="dateofpurge" placeholder="Purge Days" />
	</div>
</div>

<div className ="form-group">
<div className="form-col-4">
		<label className ="labelStyling">Archival Days</label>
	</div>
	<div className="form-col-8">
		<input className = "inputStyling"  type="number" id="dateofarchival" placeholder="Archival Days" />
	</div>
</div>

<div className ="form-group">
<div className="form-col-4">
		<label className ="labelStyling">Visible In Portal?</label>
	</div>
	<div className="form-col-8">
	<select id = "portalid" className ="dropDownStyling">
	<option value="Yes">Yes</option>
	<option value="No">No</option>
	</select>
	</div>
</div>

<div className ="form-group">
	<div className="form-col-4">
		<label className ="labelStyling">Fetch Number</label>
	</div>
	<div className="form-col-8">
		<input className = "inputStyling"  type="number" id="fetchno" placeholder="Fetch Number" readOnly ={true}/>
	</div>
</div>

<div className="form-group btnFrmGrp"> 
  <div className="offset-form-col-4 form-col-8 btnGroup">
	<input type = "reset"  className = "button frmBtn resetButtonStyling"  id="btnReset" value ="Reset"/>
	<input type="button" className ="button frmBtn" id="btnSubmit" value="Submit"/>	
	<input type="button" className="button frmBtn" id="btnUpdate" value="Update" />		   
  </div>
</div>
 </form>

  )
}


