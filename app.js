document.addEventListener("DOMContentLoaded", ()=> {
    const documentForm = document.getElementById("documentForm");
    const documentTypeSelect = document.getElementById("documentType");
    const documentFieldsDiv = document.getElementById("documentFields");
    const container = document.querySelector(".container");
    
    var selectedRow = null;

    const  createNewEntry = (selectedDocumentType, documentNumber, holdingPersonName, DOB)=>{
        const newEntry = document.createElement("div");
        newEntry.classList.add("item");
        newEntry.innerHTML = `
            <div> Document type: ${selectedDocumentType}</div>
            <div> Document number: ${documentNumber}</div>
            <div> Holding Person's Name: ${holdingPersonName}</div>
            <div> DOB: ${DOB}</div>
            <div>
                Action:
                <button class="view-btn" type="button">View</button>
                <button class="delete-btn" type="button">Delete</button>
                <button class="edit-btn" type="button">Edit</button>
            </div>
        `;
        container.appendChild(newEntry);
    };

    const updateEntry = (cells, selectedDocumentType, documentNumber, holdingPersonName, DOB) => {
        cells[0].innerText = `Document type: ${selectedDocumentType}`;
        cells[1].innerText = `Document number: ${documentNumber}`;
        cells[2].innerText = `Holding Person's Name: ${holdingPersonName}`;
        cells[3].innerText = `DOB: ${DOB}`;
    };

    const resetForm = () => {
        documentForm.reset();
        selectedRow = null;
        if (container.style.display === "none") {
            container.style.display = "block";
        }
    };

    



    documentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const selectedDocumentType = documentTypeSelect.value;
        const documentNumberInput = documentForm.querySelector("#documentNumber_"+selectedDocumentType);
        const holdingPersonNameInput = documentForm.querySelector("#holdingPersonName_"+selectedDocumentType);
        const DOBInput = documentForm.querySelector("#DOB_" + selectedDocumentType);
       



        const documentNumber = documentNumberInput.value;
        const holdingPersonName = holdingPersonNameInput.value;
        const DOB = DOBInput.value;

        if (selectedRow) {
            const cells = selectedRow.children;
            updateEntry(cells, selectedDocumentType, documentNumber, holdingPersonName, DOB);
           
        } else {
            createNewEntry(selectedDocumentType, documentNumber, holdingPersonName, DOB);
        }
        resetForm();

    });

    documentTypeSelect.addEventListener("change", () => {
        const selectedDocumentType = documentTypeSelect.value;
        var documentFieldsHTML = "";

        if (selectedDocumentType === "aadhaar") {
            documentFieldsHTML = `
            <div class='formContainer' id='aadhar'>
            <label for="documentNumber_${selectedDocumentType}">Aadhaar Number:</label>
            <input type="number" id="documentNumber_${selectedDocumentType}" name="documentNumber" required>
            <label for="holdingPersonName_${selectedDocumentType}">Name:</label>
            <input type="text" id="holdingPersonName_${selectedDocumentType}" name="holdingPersonName" required>
                <select id="gender" name="gender" required>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                </select>
                <label for="DOB_${selectedDocumentType}">Date of Birth:</label>
                <input type="date" id="DOB_${selectedDocumentType}" name="DOB" required>
                <label for="aadhaarAddress">Address:</label>
                <textarea id="aadhaarAddress" name="aadhaarAddress" required></textarea>
                
            `;
        } else if (selectedDocumentType === "drivingLicense") {
            documentFieldsHTML = `
            <div class='formContainer' id='driver'>
            <label for="documentNumber_${selectedDocumentType}">Driving License Number:</label>
            <input type="number" id="documentNumber_${selectedDocumentType}" name="documentNumber" required>
            <label for="holdingPersonName_${selectedDocumentType}">Name:</label>
            <input type="text" id="holdingPersonName_${selectedDocumentType}" name="holdingPersonName" required>
            <label for="DOB_${selectedDocumentType}">Date of issue:</label>
            <input type="date" id="DOB_${selectedDocumentType}" name="DOB" required>
                <label for="expiry">Date of Expiry:</label>
                <input type="date" id="DOE" name="DOE" required>
                
            `;
        } else if (selectedDocumentType === "panCard") {
            documentFieldsHTML = `
            <div class='formContainer' id='pan'>
            <label for="documentNumber_${selectedDocumentType}">PAN Card Number:</label>
            <input type="number" id="documentNumber_${selectedDocumentType}" name="documentNumber" required>
            <label for="holdingPersonName_${selectedDocumentType}">Name:</label>
            <input type="text" id="holdingPersonName_${selectedDocumentType}" name="holdingPersonName" required>
            <label for="DOB_${selectedDocumentType}">Date of Birth:</label>
            <input type="date" id="DOB_${selectedDocumentType}" name="DOB" required>
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

    container.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const item = event.target.closest(".item");
            item.remove();
        }

        if (event.target.classList.contains("edit-btn")) {
            selectedRow = event.target.closest(".item");
            let cells = selectedRow.children;
            let documentType = cells[0].innerText.split(":")[1].trim();
            let documentNumber = cells[1].innerText.split(":")[1].trim();
            let holdingPersonName = cells[2].innerText.split(":")[1].trim();
            let DOB = cells[3].innerText.split(":")[1].trim();

            documentTypeSelect.value = documentType;

            const documentNumberInput = documentForm.querySelector("#documentNumber_" + documentType);
            if (documentNumberInput) {
                documentNumberInput.value = documentNumber;
            }
            const holdingPersonNameInput = documentForm.querySelector("#holdingPersonName_" + documentType);
            if (holdingPersonNameInput) {
                holdingPersonNameInput.value = holdingPersonName;
            }
  
            const DOBInput = documentForm.querySelector("#DOB_" + documentType);
            if (DOBInput) {
                DOBInput.value = DOB;
            }



            documentTypeSelect.dispatchEvent(new Event('change'));
        }
        
        if (event.target.classList.contains("view-btn")) {
            const item = event.target.closest(".item");
            const documentType = item.querySelector("div:nth-child(1)").textContent.split(":")[1].trim();
            const documentNumber = item.querySelector("div:nth-child(2)").textContent.split(":")[1].trim();
            const holdingPersonName = item.querySelector("div:nth-child(3)").textContent.split(":")[1].trim();
            const DOB = item.querySelector("div:nth-child(4)").textContent.split(":")[1].trim();

            generateImage(documentType, documentNumber, holdingPersonName,DOB);

           
        }

    });

    const generateImage =(documentType, documentNumber, holdingPersonName,DOB) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        let canvasWidth = 600; 
        let canvasHeight = 400;

        const backgroundImage = new Image();
        let backgroundColor = '#ffe6e6'; 

        
        if (documentType === "drivingLicense") {
            backgroundImage.src = 'th (2).jpg';
            backgroundColor = '#F4A460'; 
            canvasWidth = 500; 
            canvasHeight = 300; 
            console.log(backgroundImage.src);
        } else if (documentType === "panCard") {
            backgroundImage.src = 'th (1).jpg';
            backgroundColor = 'FFFAFA'; 
            canvasWidth = 500; 
            canvasHeight = 300; 
        } else {
            backgroundImage.src = 'q.jpg';
        }
    
        
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;


        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
       


        
        backgroundImage.onload = () => {
            const scaleFactor = Math.min(canvas.width / backgroundImage.width, canvas.height / backgroundImage.height);
            const width = backgroundImage.width * scaleFactor;
            const height = backgroundImage.height * scaleFactor;
            const offsetX = (canvas.width - width) / 2;
            const offsetY = (canvas.height - height) / 2;

            context.drawImage(backgroundImage, offsetX, offsetY, width, height);

            context.fillStyle = '#333'; 
            context.font = 'bold 22px Arial'; 
            context.textAlign = 'left'; 

            const formattedDOB = formatDOB(DOB);

            let text = '';
            if (documentType === "aadhaar") {
                text = `--Aadhaar Card--\n#: ${documentNumber}\nName: ${holdingPersonName}\nDOB: ${formattedDOB}`;
            } else if (documentType === "drivingLicense") {
                text = `--Driving License--\n#: ${documentNumber}\nName: ${holdingPersonName}\nDOB: ${formattedDOB}`;
            } else if (documentType === "panCard") {
                text = `--PAN Card--\n#: ${documentNumber}\nName: ${holdingPersonName}\nDOB: ${formattedDOB}`;
            }

            const lines = text.split('\n');
            lines.forEach((line, index) => {
                if (line.includes('Name:')) {
                
                    const nameIndex = line.indexOf('Name:') + 6;
                    const name = line.substring(nameIndex);
                    context.font = 'italic bold 22px Arial';
                    context.fillText(`Name: ${name}`, 20, 50 + index * 50);
                } else {
                    context.fillText(line, 20, 50 + index * 50);
                }
            });
       
       
            
            


  

        const image=canvas.toDataURL("image/png");

        const newWindow = window.open();
        newWindow.document.write('<img src="' + image + '" />');
    };

};
const formatDOB = (DOB) => {
    const parts = DOB.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}


    
});



    










