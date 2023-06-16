interface CheckProps {
    state: boolean,
    todo: string
}


const CheckBox = (props: CheckProps) => {
    return(
	<div class="form-control text-lg p-3">
	  <label class="flex items-center gap-4 cursor-pointer">
	    <input type="checkbox" checked={props.state ? "checked" : ""} className="checkbox" />
	    <span class="text-regular">{props.todo}</span> 
	    <br/>
	    <span class="indicator-item badge badge-secondary">01/09/2023</span>
	  </label>
	</div>
   );
}

export default CheckBox;
