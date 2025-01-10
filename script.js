console.log("Script is loaded!");

// Select the generate button
const generateButton = document.getElementById("hopecore-link");

// GitHub raw paths for images
const regularImagePath = "https://raw.githubusercontent.com/your-new-account/your-repo/main/static/assets/hc";
const specialImagePath = "https://raw.githubusercontent.com/your-new-account/your-repo/main/static/assets/daily-reminder-that-you-will-have-this";

// Function to fetch and parse the quotes file
async function getQuotes() {
    try {
        console.log("Fetching quotes...");
        const response = await fetch("./assets/quotes.txt");
        const text = await response.text();
        console.log("Quotes fetched successfully!");
        return text.split("\n").filter((line) => line.trim() !== "");
    } catch (error) {
        console.error("Error fetching quotes:", error);
        return [];
    }
}

// Function to get a random image URL from a GitHub folder
function getRandomImage(folderPath) {
    // Random image name generation for dynamic selection
    const randomIndex = Math.floor(Math.random() * 10); // Adjust based on your folder content
    const imageName = `image${randomIndex + 1}.jpg`; // Example: image1.jpg, image2.jpg, etc.
    console.log("Generated random image name:", imageName);
    return `${folderPath}/${imageName}`;
}

// Function to generate the hopecore content
async function generateHopecore() {
    try {
        console.log("Generating hopecore content...");

        // Load quotes
        const quotes = await getQuotes();
        if (quotes.length === 0) {
            console.error("No quotes available!");
            return;
        }

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].trim();
        console.log("Random quote selected:", randomQuote);

        // Determine if the quote is special
        const isSpecialQuote = randomQuote.toLowerCase() === "daily reminder that you will have this";
        console.log("Is this a special quote?", isSpecialQuote);

        // Get a random image URL
        const folderPath = isSpecialQuote ? specialImagePath : regularImagePath;
        const imageUrl = getRandomImage(folderPath);
        console.log("Random image URL:", imageUrl);

        // Create and display the image and quote
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.alt = "Generated Hopecore Image";
        imageElement.style.maxWidth = "100%";
        imageElement.style.marginTop = "14px";
        imageElement.style.marginBottom = "24px";

        const quoteElement = document.createElement("div");
        quoteElement.textContent = randomQuote;
        quoteElement.style.marginTop = "25px";
        quoteElement.style.fontWeight = "bold";

        // Update the result container
        const resultContainer = document.getElementById("result");
        resultContainer.innerHTML = "";
        resultContainer.appendChild(quoteElement);
        resultContainer.appendChild(imageElement);
        console.log("Hopecore content generated successfully!");
    } catch (error) {
        console.error("Error generating hopecore content:", error);
    }
}

// Attach the event listener
generateButton.addEventListener("click", generateHopecore);
