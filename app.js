document.addEventListener("DOMContentLoaded", function() {
    let documentForm = document.getElementById("documentForm");
    let documentTypeSelect = document.getElementById("documentType");
    const documentFieldsDiv = document.getElementById("documentFields");
    const container = document.querySelector(".container");

    documentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let selectedDocumentType = documentTypeSelect.value;
        let documentNumberInput = document.querySelector("#documentNumber");

        
        let documentNumber = documentNumberInput.value;

        
        let newEntry = document.createElement("div");
        newEntry.classList.add("item");
        newEntry.innerHTML = `
            <div>${selectedDocumentType}</div>
            <div>${documentNumber}</div>
            <div>
                <button type="button">View</button>
                <button type="button">Delete</button>
            </div>
        `;

        
        container.appendChild(newEntry);

        
        documentForm.reset();
    });

    documentTypeSelect.addEventListener("change", function() {
        var selectedDocumentType = this.value;
        var documentFieldsHTML = "";

        if (selectedDocumentType === "aadhaar") {
            documentFieldsHTML = `
                <label for="documentNumber">Aadhaar Number:</label>
                <input type="number" id="documentNumber" name="documentNumber" required>
                <label for="aadhaarName">Name:</label>
                <input type="text" id="aadhaarName" name="aadhaarName" required>
                <label for="gender">Gender:</label>
                <select id="gender" name="gender" required>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                </select>
                <label for="aadhaarDOB">Date of Birth:</label>
                <input type="date" id="aadhaarDOB" name="aadhaarDOB" required>
                <label for="aadhaarAddress">Address:</label>
                <textarea id="aadhaarAddress" name="aadhaarAddress" required></textarea>
                <button type="submit">Save Details</button>
            `;
        } else if (selectedDocumentType === "drivingLicense") {
            documentFieldsHTML = `
                <label for="documentNumber">Driving License Number:</label>
                <input type="number" id="documentNumber" name="documentNumber" required>
                <label for="licenseName">Name:</label>
                <input type="text" id="licenseName" name="licenceName" required>
                <label for="DOB">Date of issue:</label>
                <input type="date" id="DOB" name="DOB" required>
                <label for="expiry">Date of Expiry:</label>
                <input type="date" id="DOE" name="DOE" required>
                <button type="submit">Save Details</button>
            `;
        } else if (selectedDocumentType === "panCard") {
            documentFieldsHTML = `
                <label for="documentNumber">PAN Card Number:</label>
                <input type="number" id="documentNumber" name="documentNumber" required>
                <label for="PanName">Name:</label>
                <input type="text" id="PanName" name="PanName" required>
                <label for="DOB">Date of Birth:</label>
                <input type="date" id="DOB" name="DOB" required>
                <label for="gender">Gender:</label>
                <select id="gender" name="gender" required>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                </select>
                <button type="submit">Save Details</button>
            `;
        }

        
        documentFieldsDiv.innerHTML = documentFieldsHTML;
        documentFieldsDiv.style.display = "block";
    });
});






