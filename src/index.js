import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', async () => {
  const loader = document.querySelector('.loader');
  const catInfoDiv = document.querySelector('.cat-info');

  axios.defaults.headers.common['x-api-key'] =
    'live_eTgm5gBQRpLXUYOrde2P3AlGPBuh1gPZqeTkPuv5A9C9WHocz2GIv2lehcU714mt';

  const breedSelect = new SlimSelect({
    select: '.breed-select',
    placeholder: 'Select a breed',
  });

  // Rest of your code

  // Handle breed selection
  document.querySelector('.breed-select').addEventListener('change', () => {
    const selectedBreedId = breedSelect.selected();

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
      .catch(error => {
        showError('Error fetching cat by breed', error);
      });
  });

  function showError(message, error) {
    console.error(message, error);
    const errorMessage = message || 'An error occurred.';
    Notiflix.Notify.Failure(errorMessage);
  }
});
