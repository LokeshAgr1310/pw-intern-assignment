
// declare some global variables
const fileChosenElem = document.getElementById("file-chosen");
const fileInput = document.getElementById("custom-file-btn");
const fileTable = document.getElementById("file-table-wrapper");

// handle file-input change event
fileInput.addEventListener("change", (e) => {

    // taking files from localstorage
    const uploadedFiles = localStorage.getItem("files") ? JSON.parse(localStorage.getItem("files")) : [];

    const selectedFile = e.target.files[0];

    const fileData = {
        "name": selectedFile.name,
        "lastModified": selectedFile.lastModified,
        "size": selectedFile.size,
        "type": selectedFile.type,
        "lastModifiedDate": new Date(selectedFile.lastModifiedDate).toUTCString(),
    }

    uploadedFiles.push(fileData);

    if (uploadedFiles.length !== 0) {
        localStorage.setItem("files", JSON.stringify(uploadedFiles));
    } else {
        localStorage.setItem("files", JSON.stringify(uploadedFiles));
    }

    fileChosenElem.innerHTML = `<strong>Selected File:</strong> (${selectedFile?.name})`;
    window.scrollTo(0, screen.height);
    showFilesData();

});


// get the size of file in required format (bytes, kB, MB, GB...) 
const getSizeAndUnit = (size) => {

    const oneKb = 1024;
    const oneMb = oneKb * 1024;
    const oneGB = oneMb * 1024;
    const oneTB = oneGB * 1024;

    if (size >= 0 && size < oneKb) {
        return `${size} bytes`;
    } else if (size >= oneKb && size < oneMb) {
        return `${(size / 1024).toFixed(2)} kB`;
    } else if (size >= oneMb && size < oneGB) {
        return `${(size / oneMb).toFixed(2)} MB`;
    } else if (size >= oneGB && size < oneTB) {
        return `${(size / oneGB).toFixed(2)} GB`;
    } else {
        return `${(size / oneTB).toFixed(2)} TB`;
    }
}

// show table and para message...
const showFilesData = () => {

    const uploadedFiles = localStorage.getItem("files") ? JSON.parse(localStorage.getItem("files")) : [];

    if (uploadedFiles?.length === 0) {
        fileTable.innerHTML = `<p class="no-files-para">No files uploaded yet 😓. Please upload a file 😉</p>`;
    } else {

        // sort the files array acc. the file extension
        uploadedFiles.sort((a, b) => {
            let x = a.name.split(".").at(-1).toLowerCase();
            let y = b.name.split(".").at(-1).toLowerCase();

            return x < y ? -1 : x > y ? 1 : 0;

        });

        // creating dynamic table
        const tableHTML = `<table class="dynamic-file-table">
                <thead>
                    <tr>
                    <th>
                        SNo.
                    </th>
                    <th>
                        File Name
                    </th>
                    <th>
                        File Size
                    </th>
                    <th>
                        More Details
                    </th>
                    </tr>
                </thead>
                <tbody>
                ${uploadedFiles?.map((file, i) => (
            `<tr key=${i}>
                        <td>${i + 1}</td>
                        <td>${file.name.split(".").slice(0, -1).join(".")}</td>
                        <td>${getSizeAndUnit(file.size)}</td>
                        <td>
                            <button id="more-info-btn-${i}" class="more-info-btn tooltip-wrapper">
                                Info
                                <i class="fa-solid fa-circle-info"></i>
                                <div class="tooltip-content">
                                    <ul class="tooltip-content-list">
                                        <li class="tooltip-content-list-item border-b">Name <span>${file.name}<span></li></br>
                                        <li class="tooltip-content-list-item border-b">Ext. <span>${file.name.split(".").at(-1)}<span></li></br>
                                        <li class="tooltip-content-list-item border-b">Size <span>${getSizeAndUnit(file.size)}<span></li></br>
                                        <li class="tooltip-content-list-item border-b">Type <span>${file.type.split(".")[0]}</span></li></br>
                                        <li class="tooltip-content-list-item">Last Modified <span>${new Date(file.lastModified).toDateString()}<span></li>
                                    </ul>
                                </div>
                            </button>
                        </td>
                    </tr>`
        ))}
                </tbody>
            </table>`

        fileTable.innerHTML = tableHTML;

        // removing the unwanted character
        fileTable?.firstChild.remove();

    }
};

showFilesData()