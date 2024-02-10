import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const errorElement = document.querySelector('.error');
  const catInfoDiv = document.querySelector('.cat-info');

  axios.defaults.headers.common['x-api-key'] =
    'live_eTgm5gBQRpLXUYOrde2P3AlGPBuh1gPZqeTkPuv5A9C9WHocz2GIv2lehcU714mt';

  function fetchBreeds() {
    return axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching breeds:', error);
        throw error;
      });
  }

  function fetchCatByBreed(breedId) {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    return axios
      .get(url)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching cat by breed:', error);
        throw error;
      });
  }

  // Fetch and populate breed options
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(() => {
      showError();
    })
    .finally(() => {
      breedSelect.style.display = 'block';
      loader.style.display = 'none';
    });

  // Handle breed selection
  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    // Show loader while fetching cat info
    loader.style.display = 'block';
    catInfoDiv.style.display = 'none';

    // Fetch and display cat information
    fetchCatByBreed(selectedBreedId)
      .then(catInfo => {
        // Update cat info in cat-info div
        const imageUrl = catInfo[0].url;
        const breedName = catInfo[0].breeds[0].name;
        const description = catInfo[0].breeds[0].description;
        const temperament = catInfo[0].breeds[0].temperament;

        catInfoDiv.innerHTML = `
          <img src="${imageUrl}" alt="${breedName}" />
          <p><strong>Breed:</strong> ${breedName}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Temperament:</strong> ${temperament}</p>
        `;

        // Show cat info and hide loader
        catInfoDiv.style.display = 'block';
        loader.style.display = 'none';
      })
      .catch(() => {
        showError();
      });
  });

  function showError() {
    // Display error and hide loader
    errorElement.style.display = 'block';
    loader.style.display = 'none';
  }
});
