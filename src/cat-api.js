import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_eTgm5gBQRpLXUYOrde2P3AlGPBuh1gPZqeTkPuv5A9C9WHocz2GIv2lehcU714mt';

// Function to fetch breeds
export function fetchBreeds() {
  return new Promise(async (resolve, reject) => {
    try {
      showLoader();
      const response = await axios.get('https://api.thecatapi.com/v1/breeds');
      hideLoader();
      const breeds = response.data.map(breed => ({
        id: breed.id,
        name: breed.name,
      }));
      resolve(breeds);
    } catch (error) {
      hideLoader();
      reject(error);
    }
  });
}

// Function to fetch cat information by breed
export function fetchCatByBreed(breedId) {
  return new Promise(async (resolve, reject) => {
    try {
      showLoader();
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
      );
      hideLoader();
      const catInfo = response.data[0];
      const breedInfo = catInfo.breeds[0];

      const catDetails = {
        name: breedInfo.name,
        description: breedInfo.description,
        temperament: breedInfo.temperament,
        image: catInfo.url,
      };

      resolve(catDetails);
    } catch (error) {
      hideLoader();
      reject(error);
    }
  });
}

// Helper functions to show and hide loader
function showLoader() {
  document.querySelector('.loader').style.display = 'block';
}

function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}
