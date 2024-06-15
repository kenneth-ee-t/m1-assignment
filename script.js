var photos = [];
var fileNames = [];
var imageList = [];
var image;
var openList = '<div class="photo">';
var closeList = '</div>';

var photoName = [
    "Petone Meseum",
    "Petone Police Station",
    "Petone Railway Station",
    "Iona Cross",
    "Puna W. O. Fountain",
    "Petone Wharf",
    "Petone Road",
    "Petone Quest Hotel",
    "Petone Fair Dragon",
    "Petone Playground"
];
var photoDescription = [
    "A guardian of local history, a platform for education and engagement, and a vital cultural asset for the Petone community",
    "A law enforcement facility serving the community of Petone and ensuring public safety since 1884",
    "Constructed in 1875 and has since served as a connecting hub of Petone and the wider Hutt Valley region to Wellington and other parts of the country",
    "A historic monument and a symbol of unity, faith, and heritage for both residents and visitors to Petone",
    "Represents Petone's rich Maori heritage and its connection to the local community and translates to -Well of Life- in Maori",
    "Contributed to the growth and development of Petone as an industrial and commercial center, attracting businesses and industries to the area",
    "The unique charm and historical significance of Petone's winding roads make them a memorable feature of the town's landscape",
    "Offer spacious and modern accommodation with facilities like fully-equipped kitchens, laundry facilities, and separate living areas",
    "A symbolic figure associated with local festivities and cultural events in Petone",
    "A recreational area equipped with play equipment and facilities for children and families to enjoy outdoor activities",
];

for (var i = 0; i < 10; i++) {
    fileNames.push("photo" + (i + 1));
    photos.push('<img src="gallery/' + fileNames[i] + '.jpg">');
    image = openList + photos[i] + '<div class="desc">' + photoName[i] + '</div>' + '<p>' + photoDescription[i] + '</p>' + closeList;
    imageList.push(image);
}
document.getElementById("gallery-set").innerHTML = imageList.join(" ");

document.addEventListener("DOMContentLoaded", function() {
    var descElements = document.querySelectorAll('.desc');
    var pElements = document.querySelectorAll('.photo p');

    descElements.forEach(function(element, index) {
        element.addEventListener('click', function() {
            showPopup(index);
        });
    });

    pElements.forEach(function(element, index) {
        element.addEventListener('click', function() {
            // Find the index by climbing up the DOM to the parent .photo and then fetching its index
            var photoElement = element.closest('.photo');
            var photoIndex = Array.from(photoElement.parentNode.children).indexOf(photoElement);
            showPopup(photoIndex);
        });
    });
});

function showPopup(index) {
    // Create information box container
    var infoBoxContainer = document.createElement("div");
    infoBoxContainer.id = "infoBoxContainer";
    infoBoxContainer.style.position = "fixed";
    infoBoxContainer.style.top = "0";
    infoBoxContainer.style.left = "0";
    infoBoxContainer.style.width = "100%";
    infoBoxContainer.style.height = "100%";
    infoBoxContainer.style.zIndex = "999";

    // Create information box
    var infoBox = document.createElement("div");
    infoBox.id = "infoBox";
    infoBox.className = "popup-content";  // Apply a class for styling
    infoBox.style.position = "fixed";  // Use absolute positioning for centering within the gallery
    infoBox.style.top = "50%";             // Center vertically within the gallery
    infoBox.style.left = "50%";            // Center horizontally within the gallery
    infoBox.style.width = "300px";
    infoBox.style.borderRadius = "12px";
    infoBox.style.transform = "translate(-50%, -50%)";  // Adjust for centering
    infoBox.style.background = "Black";
    infoBox.style.opacity = ".85";
    infoBox.style.padding = "20px";
    infoBox.style.zIndex = "1000";  // Ensure popup appears above overlay
    infoBox.style.display = "flex";
    infoBox.style.flexDirection = "column"; // Column layout for flexbox
    infoBox.style.alignItems = "left";     // Center horizontally

    // Create caption heading
    var caption = document.createElement("h2");
    caption.style.color = "White";
    caption.style.textAlign = "left";
    caption.style.marginTop = "6px";
    caption.textContent = photoName[index];

    // Create text information
    var infoText = document.createElement("p");
    infoText.style.color = "White";
    infoText.textContent = photoDescription[index];

    // Create close link
    var closeLink = document.createElement("a");
    closeLink.textContent = "Click This To Close";
    closeLink.style.color = "rgb(251, 236, 93)";
    closeLink.style.textAlign = "center";
    closeLink.style.padding = "40px 60px";
    closeLink.href = "#";
    closeLink.style.textDecoration = "none"; // Ensure no underline
    closeLink.onclick = function () {
        event.preventDefault(); // Prevent the default anchor behavior
        infoBoxContainer.style.visibility = "hidden"; // Hide the info box container when clicked
    };

    // Append elements to infoBox
    infoBox.appendChild(caption);
    infoBox.appendChild(infoText);
    infoBox.appendChild(closeLink);

    // Append infoBox to infoBoxContainer
    infoBoxContainer.appendChild(infoBox);

    // Append infoBoxContainer to #gallery
    var gallerySection = document.getElementById("gallery");
    gallerySection.appendChild(infoBoxContainer);
}