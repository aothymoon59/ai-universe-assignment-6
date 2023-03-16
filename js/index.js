// global variable for sorting data
let cardData = [];

// load data here

const loadData = async () => {
  // spinner start here
  toggleLoader(true);
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    showToolsData(data.data.tools.slice(0, 6));
    // data added for sorting
    cardData = data.data.tools.slice(0, 6);
  } catch (error) {
    console.log(error);
  }
};

// show or display data here

const showToolsData = (cards) => {
  //   card container here
  const cardContainer = document.getElementById("card-container");

  //   see more button show and hide
  const seeMoreBtn = document.getElementById("show-all");
  if (cards.length > 6) {
    seeMoreBtn.classList.add("hidden");
  } else {
    seeMoreBtn.classList.remove("hidden");
  }

  cardContainer.innerHTML = "";

  cards.forEach((card) => {
    // card destructuring here
    const { image, features, name, published_in, id } = card;
    // create card
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
    <div class="card card-compact bg-base-100 shadow-xl p-5">
        <div class="">
            <img src="${image}" alt="${name}" class="h-[300px] w-full rounded-2xl" />
        </div>
        <div class="card-body">
            <div class="h-[100px]">
                <h2 class="text-2xl font-semibold font-dark1 mb-2">Features</h2>
                <ol id ="${id}" class="list-decimal text-dark2 px-4">
                    
                </ol>
            </div>
            <hr class="my-6">
            <div class="flex justify-between items-center">
                <div class="">
                    <h2 class="text-2xl font-semibold font-dark1">${name}</h2>
                    <p class="font-medium text-dark2"><i class="fa-solid fa-calendar-days mr-1"></i> ${published_in}</p>
                </div>
                <div class="">

                <label onclick="loadCardDetails('${id}')" for="my-modal-5" class="bg-[#FEF7F7] text-[#EB5757] p-4 rounded-[50%]" btn><i class="fa-solid fa-arrow-right"></i></label>
                </div>
            </div>
        </div>
    </div>
    `;
    // append card to card container
    cardContainer.appendChild(cardDiv);

    // features added dynamically
    const ol = document.getElementById(id);
    features.forEach((feature) => {
      const li = document.createElement("li");
      li.innerText = `${feature}`;
      ol.appendChild(li);
    });
  });

  //   spinner stop here
  toggleLoader(false);
};

// spinner or loader function here
const toggleLoader = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

// load single card details by id
const loadCardDetails = async (id) => {
  const singleURL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  try {
    const res = await fetch(singleURL);
    const data = await res.json();
    showSingleCardDetails(data.data);
  } catch (error) {
    console.log(error);
  }
};

// show single card details
const showSingleCardDetails = (card) => {
  const {
    description,
    pricing,
    features,
    tool_name,
    integrations,
    image_link,
    input_output_examples,
    accuracy,
  } = card;
  const integrationsId = tool_name + 1;
  const modalCardsContainer = document.getElementById("modal-cards");
  modalCardsContainer.innerHTML = `
    
        <div class="card card-compact lg:h-full bg-[#FFF7F7] border border-[#EB5757] shadow-xl">
            <div class="card-body">
                <p class="text-dark1 font-semibold text-base sm:text-lg lg:text-2xl">${description}</p>
                <div class="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 justify-center sm:justify-between text-center">
                    <div class="bg-white rounded-2xl font-bold p-3 text-[#03A30A]">
                    ${
                      pricing
                        ? pricing[0]?.plan === "Free" ||
                          pricing[0]?.price === "No cost" ||
                          pricing[0]?.price === "0"
                          ? "Free of Cost/"
                          : pricing[0]?.price
                        : "Free of Cost"
                    } <br>
                    ${pricing ? pricing[0]?.plan : ""}
                    </div>
                    <div class="bg-white rounded-2xl font-bold p-3 text-[#F28927]">
                    ${
                      pricing
                        ? pricing[1]?.plan === "Free" ||
                          pricing[1]?.price === "No cost"
                          ? "Free of Cost/"
                          : pricing[1]?.price
                        : "Free of Cost"
                    } <br>
                    ${pricing ? pricing[1]?.plan : ""}
                    </div>
                    <div class="bg-white rounded-2xl font-bold p-3 text-[#EB5757]">
                    ${
                      pricing
                        ? pricing[2]?.plan === "Free" ||
                          pricing[2]?.price === "No cost"
                          ? "Free of Cost/"
                          : pricing[2]?.price
                        : "Free of Cost"
                    } <br>
                    ${pricing ? pricing[2]?.plan : ""}
                    </div>
                     
                </div>
                <div class="flex flex-col md:flex-row gap-2 md:gap-4 text-center md:text-left justify-around">
                    <div>
                        <h2 class="text-dark1 font-semibold mb-2 text-lg lg:text-2xl">Features</h2>
                        <ul id="${tool_name}" class="list-disc w-[60%] md:w-full mx-auto text-dark2">
                            
                        </ul>
                    </div>
                    <div>
                        <h2 class="text-dark1 font-semibold mb-2 text-lg lg:text-2xl">Integrations</h2>
                        <ul id="${integrationsId}" class="list-disc w-[60%] md:w-full mx-auto text-dark2">
                        
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="card card-compact p-5 bg-base-100 shadow-xl lg:h-full">
            <button id="accuracy" class="text-white bg-[#EB5757] font-medium md:font-semibold rounded-lg py-2 px-2 md:px-4 w-fit absolute right-[7%] top-[7%]"></button>
            
            <figure class="h-[200px]"><img class="h-full w-full rounded-2xl" src="${
              image_link[0]
            }" alt="" />
            </figure>
            <div class="card-body text-center">
                <h2 class="text-base sm:text-lg lg:text-2xl font-semibold text-dark1">${
                  input_output_examples
                    ? input_output_examples[0].input
                    : "Can you give any example?"
                }</h2>
                <p class="text-dark2">${
                  input_output_examples
                    ? input_output_examples[0].output
                    : "No! Not Yet! Take a break!!!"
                }</p>
            </div>
        </div>
    
  `;
  //accuracy button functionality
  const accuracyBtn = document.getElementById("accuracy");
  if (accuracy.score) {
    const accuracyVal = accuracy.score * 100;
    accuracyBtn.innerText = `${accuracyVal}% accuracy`;
  } else {
    accuracyBtn.classList.add("hidden");
  }
  // Features inside modal added here
  const ulContainer = document.getElementById(tool_name);
  Object.values(features).forEach((feature) => {
    const featureLi = document.createElement("li");
    featureLi.innerText = feature.feature_name;
    ulContainer.appendChild(featureLi);
  });
  //   integrations inside modal added here
  const integrationsContainer = document.getElementById(integrationsId);

  if (integrations) {
    integrations.forEach((integration) => {
      const integrationLi = document.createElement("li");
      integrationLi.innerHTML = integration;
      integrationsContainer.appendChild(integrationLi);
    });
  } else {
    const integrationNo = document.createElement("p");
    integrationNo.innerHTML = "No data Found";
    integrationsContainer.appendChild(integrationNo);
  }
};

// load data here

loadData();

// see more button functionality here

const seeMore = async () => {
  // spinner start here
  toggleLoader(true);
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    showToolsData(data.data.tools);
    // data added for sorting
    cardData = data.data.tools;
  } catch (error) {
    console.log(error);
  }
};

// sorting function here

const sorted = () => {
  // spinner start here
  toggleLoader(true);
  const sortingData = (a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);
    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    } else {
      return 0;
    }
  };
  // sorting data added here
  showToolsData(cardData.sort(sortingData));
};
