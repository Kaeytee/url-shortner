const urlInput = document.getElementById('urlInput');
const urlTableBody = document.getElementById('urlTableBody');
let urlList = JSON.parse(localStorage.getItem('urlList')) || [];

// Function to shorten the URL using TinyURL API
async function shortenURL() {
    const originalURL = urlInput.value.trim();

    if (originalURL) {
        try {
            const response = await fetch(`https://api.tinyurl.com/create`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ge3aT4chkYH97iYYxyWabisf3vLplQuCFI5qzg6RTKTJwILiy8npirngDHqf',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: originalURL })
            });
            const data = await response.json();

            if (data && data.data && data.data.tiny_url) {
                const shortURL = data.data.tiny_url;
                const urlData = { originalURL, shortURL };

                // Save to local storage
                urlList.push(urlData);
                localStorage.setItem('urlList', JSON.stringify(urlList));

                // Update the table
                addToTable(urlData, urlList.length);
                urlInput.value = ''; // Clear input field
            } else {
                console.error('Failed to shorten the URL.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

// Function to add a new row to the table
function addToTable(urlData, index) {
    const newRow = `
        <tr>
            <th scope="row">${index}</th>
            <td><a href="${urlData.originalURL}" target="_blank">${urlData.originalURL}</a></td>
            <td><a href="${urlData.shortURL}" target="_blank" class="short-url">${urlData.shortURL}</a></td>
        </tr>
    `;
    urlTableBody.insertAdjacentHTML('beforeend', newRow);
}

// Function to load data from local storage and populate the table on page load
function loadTable() {
    urlList.forEach((urlData, index) => {
        addToTable(urlData, index + 1);
    });
}

// Initialize the table with stored data on page load
window.onload = loadTable;