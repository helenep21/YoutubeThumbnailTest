document.addEventListener('DOMContentLoaded', () => {
    console.log("Popup initialized");
    
    const titleInput = document.getElementById('titleInput');
    const fileInput = document.getElementById('fileInput');
    const fileLabelText = document.getElementById('fileLabelText');
    const previewContainer = document.getElementById('previewContainer');
    const previewImg = document.getElementById('previewImg');
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');
    const status = document.getElementById('status');

    // 1. Load Data
    chrome.storage.local.get(['testTitle', 'testThumbnail'], (data) => {
        if (data.testTitle) titleInput.value = data.testTitle;
        if (data.testThumbnail) {
            previewImg.src = data.testThumbnail;
            previewContainer.style.display = "block";
            fileLabelText.textContent = "Change Image";
        }
    });

    // 2. Handle File Input (The standard 'change' event)
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        console.log("File selected:", file.name);
        fileLabelText.textContent = file.name.substring(0, 15) + "...";
        
        const reader = new FileReader();
        reader.onload = (event) => {
            previewImg.src = event.target.result;
            previewContainer.style.display = "block";
            console.log("Image preview generated");
        };
        reader.readAsDataURL(file);
    });

    // 3. Save Logic
    saveBtn.addEventListener('click', () => {
        const title = titleInput.value;
        const imgSrc = previewImg.src;

        if (!title || !imgSrc || imgSrc.length < 50) {
            status.textContent = "Error: Title or Image missing";
            status.style.color = "red";
            return;
        }

        chrome.storage.local.set({
            'testTitle': title,
            'testThumbnail': imgSrc
        }, () => {
            console.log("Data saved successfully");
            status.textContent = "Saved! Right-click any video to test.";
            status.style.color = "green";
        });
    });

    // 4. Reset Logic (Fix for 'stuck' data)
    resetBtn.addEventListener('click', () => {
        chrome.storage.local.clear(() => {
            titleInput.value = "";
            previewImg.src = "";
            previewContainer.style.display = "none";
            fileLabelText.textContent = "Select Image";
            status.textContent = "Data cleared.";
            status.style.color = "black";
        });
    });
});
