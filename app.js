document.addEventListener("DOMContentLoaded", function() {
    var documentForm = document.getElementById("documentForm");
    var documentTypeSelect = document.getElementById("documentType");
    var documentFieldsDiv = document.getElementById("documentFields");
    var savedDetailsTableBody = document.querySelector("#savedDetailsTable tbody");

    documentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var selectedDocumentType = documentTypeSelect.value;
        var documentNumberInput = document.querySelector("#documentNumber");

        // Get the entered document number
        var documentNumber = documentNumberInput.value;

        // Create a new row for the table
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${selectedDocumentType}</td>
            <td>${documentNumber}</td>
            <td>
                            <button type="button">View</button>
                            <button type="button">Delete</button>
                        </td>
            <!-- Add more table cells if needed -->
        `;

        // Append the new row to the table
        savedDetailsTableBody.appendChild(newRow);

        // Clear the form fields
        documentForm.reset();
    });

    documentTypeSelect.addEventListener("change", function() {
        var selectedDocumentType = this.value;
        var documentFieldsHTML = "";

        // Dynamically generate fields based on the selected document type
        if (selectedDocumentType === "aadhaar") {
            documentFieldsHTML = `
                <label for="documentNumber">Aadhaar Number:</label>
                <input type="number" id="documentNumber" name="documentNumber" required>
                <label for="aadhaarName">Name:</label>
                <input type="text" id="aadhaarName" name="aadhaarName" required>
                <label for="gender">gender:</label>
                <select id="text" name="gender" required>
                <option value="aadhaar">MALE</option>
                    <option value="drivingLicense">FEMALE</option>
                    </select>
                <label for="aadhaarDOB">Date of Birth:</label>
                <input type="date" id="aadhaarDOB" name="aadhaarDOB" required>
                <label for="aadhaarAddress">Address:</label>
                <textarea id="aadhaarAddress" name="aadhaarAddress" required></textarea>
                <button type="submit">Save Details</button>

            `
            ;
        } else if (selectedDocumentType === "drivingLicense") {
            documentFieldsHTML = `
                <label for="documentNumber">Driving License Number:</label>
                <input type="text" id="documentNumber" name="documentNumber" required>
                <label for="licenseName">Name:</label>
                <input type="text" id="licenseName" name="licenceName" required>
                <label for="DOB">Date of issue:</label>
                <input type="date" id="DOB" name="DOB" required>
                <label for="expiry">Date of Expiry:</label>
                <input type="date" id="DOE" name="DOE" required>
                

                <!-- Add more fields for driving license if needed -->
            `;
        } else if (selectedDocumentType === "panCard") {
            documentFieldsHTML = `
                <label for="documentNumber">PAN Card Number:</label>
                <input type="text" id="documentNumber" name="documentNumber" required>
                <label for="PanName">Name:</label>
                <input type="text" id="PanName" name="PanName" required>
                <label for="DOB">Date of Birth:</label>
                <input type="date" id="DOB" name="DOB" required>
                <label for="gender">gender:</label>
                <select id="text" name="gender" required>
                <option value="aadhaar">MALE</option>
                    <option value="drivingLicense">FEMALE</option>
                    </select>
                <!-- Add more fields for PAN card if needed -->
            `;
        }

        // Display the dynamically generated fields
        documentFieldsDiv.innerHTML = documentFieldsHTML;
        documentFieldsDiv.style.display = "block";
        });

});

