const CreateActivity= () =>{
    return(
        <>
       <h1> <center> Create Session</center></h1>
        <br/> Start with what you want to Create.
        <div name="Create">
              <label> Session Type: </label> 
              <select id="" name="">
              <option value=""> --Select Session --</option>
                <option value="Class"> Class</option>
                <option value="Workshop"> Workshop</option>
             </select>
             <label> Level: </label> 
             <select id="" name="">
              <option value=""> --Select Level--</option>
                <option value="Beginner"> Beginner</option>
                <option value="Intermediate"> Intermediate</option>
                <option value="Advance"> Advance</option>
             </select> <br/> <br/>
             <label> Client Capacity:</label>
             <input type="number" title="Enter the maximum clients you want to accomodate"></input>
             <br/> <br/>
             <label> Pricing Rate:</label>
             <input type="number" title="Rate in Pounds"></input>
             </div>
             <br/> 
             <label for="date">Select a Starting Date:</label>
            <input type="date" id="date" name="startdate"/> 
            <label for="date">Select an Ending Date:</label>
            <input type="date" id="date" name="enddate"/> <br/>
            <br/> <label> Duration:</label>
            <input type="number" title="In Minutes" min="30"></input> <br/>
            <input type="submit" value="Submit"></input>
            
          <h2>For Retreat</h2>
            

        </>
    )       
}

export default CreateActivity