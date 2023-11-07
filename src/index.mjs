
const dogBreeds = [
  "retriever",
  "labrador",
  "beagle",
  "husky",
  "samoyed"
];

async function fetchDogImage(breed) {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      const data = await response.json();
      return data.message;
}

async function fetchBreedSummary(breed) {
  try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`);
      const data = await response.json();
      return data.extract;
  } catch (error) {
      console.error(`Error`);
      return "Error, No information available";
  }
}

async function createWikiItem(breed) {
  const wikiItem = document.createElement("div");
  wikiItem.className = "wiki-item";
  const wikiHeader = document.createElement("h1");
  wikiHeader.className = "wiki-header";
  wikiHeader.textContent = breed;
  const wikiContent = document.createElement("div");
  wikiContent.className = "wiki-content";
  const wikiText = document.createElement("p");
  wikiText.className = "wiki-text";
  const summary = await fetchBreedSummary(breed);
  wikiText.textContent = summary;
  const imgContainer = document.createElement("div");
  imgContainer.className = "img-container";
  const wikiImg = document.createElement("img");
  wikiImg.className = "wiki-img";


  // Fetch a dog image by breed and set it as the image source
  const imageUrl = await fetchDogImage(breed);
  if (imageUrl) {
      wikiImg.src = imageUrl;
  } else {
      wikiImg.src = "placeholder.jpg"; 
  }

  imgContainer.appendChild(wikiImg);
  wikiContent.appendChild(wikiText);
  wikiContent.appendChild(imgContainer);
  wikiItem.appendChild(wikiHeader);
  wikiItem.appendChild(wikiContent);

  return wikiItem;
}

const wikiContainer = document.getElementById("wiki-container");

// Loop through dog breeds and create wiki items with dog images
dogBreeds.forEach(async breed => {
  const wikiItem = await createWikiItem(breed);
  wikiContainer.appendChild(wikiItem);
});
