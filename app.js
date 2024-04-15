document.addEventListener("DOMContentLoaded", function() {
    let documentForm = document.getElementById("documentForm");
    let documentTypeSelect = document.getElementById("documentType");
    const documentFieldsDiv = document.getElementById("documentFields");
    const container = document.querySelector(".container");
    
    var selectedRow = null;

    documentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let selectedDocumentType = documentTypeSelect.value;
        let documentNumberInput = document.querySelector("#documentNumber");
        let holdingPersonNameInput = document.querySelector("#holdingPersonName");

        let documentNumber = documentNumberInput.value;
        let holdingPersonName = holdingPersonNameInput.value;

        if (selectedRow) {
            let cells = selectedRow.children;
            cells[0].innerText = `Document type: ${selectedDocumentType}`;
            cells[1].innerText = `Document number: ${documentNumber}`;
            cells[2].innerText = `Holding Person's Name: ${holdingPersonName}`;
        } else {
            let newEntry = document.createElement("div");
            newEntry.classList.add("item");
            newEntry.innerHTML = `
                <div> Document type: ${selectedDocumentType}</div>
                <div> Document number: ${documentNumber}</div>
                <div> Holding Person's Name: ${holdingPersonName}</div>
                <div>
                    Action:
                    <button class="view-btn" type="button">View</button>
                    <button class="delete-btn" type="button">Delete</button>
                    <button class="edit-btn" type="button">Edit</button>
                </div>
            `;

            container.appendChild(newEntry);
        }

        documentForm.reset();
        selectedRow = null;
        
        container.style.display = "block";
    });

    documentTypeSelect.addEventListener("change", function() {
        let selectedDocumentType = this.value;
        var documentFieldsHTML = "";

        if (selectedDocumentType === "aadhaar") {
            documentFieldsHTML = `
            <div class='formContainer' id='aadhar'>
                <label for="documentNumber">Aadhaar Number:</label>
                <input type="number" id="documentNumber" name="documentNumber" required>
                <label for="holdingPersonName">Name:</label>
                <input type="text" id="holdingPersonName" name="holdingPersonName" required>
                <label for="gender">Gender:</label>
                <select id="gender" name="gender" required>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                </select>
                <label for="aadhaarDOB">Date of Birth:</label>
                <input type="date" id="aadhaarDOB" name="aadhaarDOB" required>
                <label for="aadhaarAddress">Address:</label>
                <textarea id="aadhaarAddress" name="aadhaarAddress" required></textarea>
                
            `;
        } else if (selectedDocumentType === "drivingLicense") {
            documentFieldsHTML = `
            <div class='formContainer' id='driver'>
                <label for="documentNumber">Driving License Number:</label>
                <input type="number" id="documentNumber" name="documentNumber" required>
                <label for="holdingPersonName">Name:</label>
                <input type="text" id="holdingPersonName" name="holdingPersonName" required>
                <label for="DOB">Date of issue:</label>
                <input type="date" id="DOB" name="DOB" required>
                <label for="expiry">Date of Expiry:</label>
                <input type="date" id="DOE" name="DOE" required>
                
            `;
        } else if (selectedDocumentType === "panCard") {
            documentFieldsHTML = `
            <div class='formContainer' id='pan'>
                <label for="documentNumber">PAN Card Number:</label>
                <input type="number" id="documentNumber" name="documentNumber" required>
                <label for="holdingPersonName">Name:</label>
                <input type="text" id="holdingPersonName" name="holdingPersonName" required>
                <label for="DOB">Date of Birth:</label>
                <input type="date" id="DOB" name="DOB" required>
                <label for="gender">Gender:</label>
                <select id="gender" name="gender" required>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                </select>
                
            `;
        }

        
        documentFieldsDiv.innerHTML = documentFieldsHTML;
        documentFieldsDiv.style.display = "block";
    });

    container.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            let item = event.target.closest(".item");
            item.remove();
        }

        if (event.target.classList.contains("edit-btn")) {
            selectedRow = event.target.closest(".item");
            let cells = selectedRow.children;
            let documentType = cells[0].innerText.split(":")[1].trim();
            let documentNumber = cells[1].innerText.split(":")[1].trim();
            let holdingPersonName = cells[2].innerText.split(":")[1].trim();
            documentTypeSelect.value = documentType;
            document.querySelector("#documentNumber").value = documentNumber;
            document.querySelector("#holdingPersonName").value = holdingPersonName;

            documentTypeSelect.dispatchEvent(new Event('change'));
        }
        
        if (event.target.classList.contains("view-btn")) {
            let item = event.target.closest(".item");
            let documentType = item.querySelector("div:nth-child(1)").textContent.split(":")[1].trim();
            let documentNumber = item.querySelector("div:nth-child(2)").textContent.split(":")[1].trim();
            let holdingPersonName = item.querySelector("div:nth-child(3)").textContent.split(":")[1].trim();

            generateImage(documentType, documentNumber, holdingPersonName);

           
        }

    });

    function generateImage(documentType, documentNumber, holdingPersonName) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        let canvasWidth = 600; 
        let canvasHeight = 400;

        const backgroundImage = new Image();
        let backgroundColor = '#ffe6e6'; 

        
        if (documentType === "drivingLicense") {
            backgroundImage.src = 'e.webp';
            backgroundColor = '#f0fff0'; 
            canvasWidth = 800; 
            canvasHeight = 400; 
            console.log(backgroundImage.src);
        } else if (documentType === "panCard") {
            backgroundImage.src = 't.png';
            backgroundColor = '#E0FFFF'; 
            canvasWidth = 800; 
            canvasHeight = 400; 
        } else {
            backgroundImage.src = 'q.jpg';
        }
    
        
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;


        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
       


        
        backgroundImage.onload = function() {
            const scaleFactor = Math.min(canvas.width / this.width, canvas.height / this.height);
            const width = this.width * scaleFactor;
            const height = this.height * scaleFactor;
            const offsetX = (canvas.width - width) / 2;
            const offsetY = (canvas.height - height) / 2;

            context.drawImage(backgroundImage, offsetX, offsetY, width, height);

            context.fillStyle = '#333'; 
            context.font = 'bold 22px Arial'; 
            context.textAlign = 'left'; 
            
            
            context.fillText(`Document Type: ${documentType}`, 20, 50);
            
            
            context.fillText(`Document Number: ${documentNumber}`, 20, 100);
            
            
            context.fillText(`Holder's Name: ${holdingPersonName}`, 20, 150);

  

        const image=canvas.toDataURL("image/png");

        const newWindow = window.open();
        newWindow.document.write('<img src="' + image + '" />');
    };

}



    
});









