import "./displayFir.css"; // Assuming you have a CSS file for styling

export default function DisplayFir({initialFIR}) {
  const firData = initialFIR ;
  return (
    <div className="fir-container">
      <h2>FIR Form</h2>
      <label>
        FIR Number:
        <input
          type="text"
          value={firData.firNumber}
          readOnly
        />
      </label>

      <fieldset>
        <legend>Police Station</legend>
        {["name", "district", "state"].map((field) => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type="text"
              value={firData.policeStation[field]}
             
              readOnly
            />
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Complainant</legend>
        {[
          "fullName",
          "parentsName",
          "age",
          "gender",
          "dob",
          "nationality",
          "occupation",
          "address",
          "phoneNumber",
          "emailAddress",
        ].map((field) => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type={"text"}
              value={firData.complainant[field]}
             
              readOnly
            />
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Complainant ID Proof</legend>
        {["idType", "idNumber"].map((field) => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type="text"
              value={firData.complainantIdProof[field]}
             
              readOnly
            />
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Incident Details</legend>
        {[
          "occurrenceStartTime",
          "occurrenceEndTime",
          "placeOfOccurrence",
          "distanceFromStation",
          "offenceType",
          "description",
          "actAndSections",
        ].map((field) => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type="text"
              value={firData.incidentDetails[field]}
              
              readOnly
            />
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Accused Persons</legend>
        {firData.accusedPersons.map((accused, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              marginBottom: 10,
              padding: 10,
              borderRadius: 5,
            }}
          >
            {[
              "name",
              "aliasName",
              "address",
              "age",
              "gender",
              "relationWithComplainant",
            ].map((field) => (
              <label key={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
                <input
                  type={"text"}
                  value={accused[field]}
                  
                  readOnly
                />
              </label>
            ))}
          
          </div>
        ))}
        
      </fieldset>

      <fieldset>
        <legend>Witnesses</legend>
        {firData.witnesses.map((witness, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              marginBottom: 10,
              padding: 10,
              borderRadius: 5,
            }}
          >
            {["name", "address", "contactInfo"].map((field) => (
              <label key={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
                <input
                  type="text"
                  value={witness[field]}
                  readOnly
                />
              </label>
            ))}
       
          </div>
        ))}
     
      </fieldset>

      <fieldset>
        <legend>Evidence Details</legend>
        {[
          "documents",
          "mediaType",
          "mediaDescription",
          "physicalDescription",
        ].map((field) => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type="text"
              value={firData.evidenceDetails[field]}
              readOnly
            />
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Investigation Officer</legend>
        {["ioName", "ioRank", "ioBadgeNumber", "dispatchDate"].map((field) => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type={field === "dispatchDate" ? "date" : "text"}
              value={firData.investigationOfficer[field]}
             
              readOnly
            />
          </label>
        ))}
      </fieldset>

      {/* You can add a submit button here */}
      <button onClick={() => alert(JSON.stringify(firData, null, 2))}>Show FIR JSON</button>
    </div>
  );
}
