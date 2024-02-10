document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".breed-select"),t=document.querySelector(".loader"),n=document.querySelector(".cat-info"),a=()=>{t.style.display="block",e.style.display="none"},o=async()=>{try{a();const r=e.value,c=await fetchCatByBreed(r);o=c,t.style.display="none",e.style.display="none",n.style.display="block",n.innerHTML=`\n      <h2>${o.name}</h2>\n      <p>Description: ${o.description}</p>\n      <p>Temperament: ${o.temperament}</p>\n      <img src="${o.image}" alt="Cat Image" />\n    `}catch(e){console.error("Error fetching cat information:",e),showError("Failed to fetch cat information. Please try again.")}var o};(async()=>{try{a();const n=await fetchBreeds();t.style.display="none",e.style.display="block",new SlimSelect({select:e,placeholder:"Select a breed",allowDeselect:!0,onChange:o}),n.forEach((t=>{e.options.add(new Option(t.name,t.id))}))}catch(e){console.error("Error fetching cat breeds:",e),showError("Failed to fetch cat breeds. Please try again.")}})()}));
//# sourceMappingURL=index.9a620f44.js.map
