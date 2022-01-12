import * as React from "react";

import { useForm } from "react-hook-form";

export default function Form() {

 const { register, handleSubmit } = useForm();
 return (

   <form className="pcfForm">
     <div className='formField'>
      <label>EntityName</label>
      <div className="entitySearchInput">
        <input type = "text" id="entity"  placeholder="Entity Name" className="formInput"/>

        <button className="entitySearchBTN">Search</button>
      </div>
     </div>
     <div className='formField'>
      <label>Logical Name</label>
      <input type = "text" id = "logical" placeholder="Logical Name"  className="formInput"/>
     </div>
     <div className='formField'>
      <label>Schema Name</label>
      <input type = "text" id ="schema" placeholder="Schema Name"  className="formInput" />
     </div>
     <div className='formField'>
      <label>Fetch XML</label>
      <textarea rows={4} id = "fetchxml" placeholder="Fetch XML" className="formTextArea" ></textarea>
     </div>
     <div className='formField'>
      <label>Purge Days</label>
      <input type = "text" id ="dateofpurge" placeholder="Purge Days" className="formInput"/>
     </div>
     <div className='formField'>
      <label>Archival Days</label>
      <input type = "text"id="dateofarchival" placeholder="Archival Days" className="formInput"/>
     </div>
     <div className='formField'>
      <label>Fetch Number</label>
      <input type = "text" id="fetchno"  placeholder="Fetch Number" className="formInput"/>
     </div>
     <div className='formField'>
     <input type="button" id="btnSubmit" value="Submit"/>	
	   <input style={{display:"none"}} type="button" id="btnupdate" value="Update"/>	
	    </div>
   </form>
 );

}
