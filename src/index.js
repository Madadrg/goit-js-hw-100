document.addEventListener('DOMContentLoaded', function () {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const catInfo = document.querySelector('.cat-info');

  const showLoader = () => {
    loader.style.display = 'block';
    breedSelect.style.display = 'none';
  };

  const hideLoader = () => {
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
  };

  const showCatInfo = data => {
    loader.style.display = 'none';
    breedSelect.style.display = 'none';
    catInfo.style.display = 'block';

    catInfo.innerHTML = `
      <h2>${data.name}</h2>
      <p>Description: ${data.description}</p>
      <p>Temperament: ${data.temperament}</p>
      <img src="${data.image}" alt="Cat Image" />
    `;
  };

  const fetchCatInfo = async () => {
    try {
      showLoader();
      const selectedBreedId = breedSelect.value;
      const catDetails = await fetchCatByBreed(selectedBreedId);
      showCatInfo(catDetails);
    } catch (error) {
      console.error('Error fetching cat information:', error);
      showError('Failed to fetch cat information. Please try again.');
    }
  };

  const initializeApp = async () => {
    try {
      showLoader();
      const breeds = await fetchBreeds();
      hideLoader();

      new SlimSelect({
        select: breedSelect,
        placeholder: 'Select a breed',
        allowDeselect: true,
        onChange: fetchCatInfo,
      });

      breeds.forEach(breed => {
        breedSelect.options.add(new Option(breed.name, breed.id));
      });
    } catch (error) {
      console.error('Error fetching cat breeds:', error);
      showError('Failed to fetch cat breeds. Please try again.');
    }
  };

  const fetchBreeds = async () => {
    try {
      const response = await fetch('https://api.example.com/breeds');
      const breeds = await response.json();
      return breeds;
    } catch (error) {
      throw new Error('Failed to fetch cat breeds. Please try again.');
    }
  };

  const showError = message => {
    alert(message);
  };

  initializeApp();
});
