// ===============================================
//                JS_apis_fake_shop
// ===============================================

const itemGallery = document.body.querySelector('#itemGallery');
const selectedOption = document.body.querySelector('#selectedOption');
const searchBarInput = document.body.querySelector('#searchBarInput');
let currentDataArray = [];
let allProductsKey = 'https://fakestoreapi.com/products';
searchBarInput.value = "";

// =======================================
//   fetch request ––> get all products
// =======================================
const fetchRequest = (apiKey) =>
{
    fetch(apiKey)
        .then(res => res.json())
        .then(shopData => 
            {
                let shopDataArray = [...shopData];
                sortByPrice(shopDataArray);
                renderItems(shopDataArray);
                currentDataArray = shopDataArray;
            });
}

fetchRequest(allProductsKey);

// ======================
//    search by input
// ======================
const searchInput = () =>
{
    const filteredData = currentDataArray.filter(item => 
    {
        if(item.title.toLowerCase().includes(searchBarInput.value.trim().toLowerCase()))
        {
            return item;
        }
    })
    itemGallery.innerHTML = "";
    renderItems(filteredData);
};

// ======================
//   filter by category
// ======================
const renderCategory = () =>
{
    const allCategoryBtns = document.body.querySelectorAll('button');

    for(const button of allCategoryBtns)
    {
        const category = button.textContent.toLocaleLowerCase()
        button.addEventListener('click', () =>
        {
            searchBarInput.value = "";
            if(category === "electronics")
            {
                itemGallery.innerHTML = "";
                apiKey = 'https://fakestoreapi.com/products/category/electronics';
                fetchRequest(apiKey);
            }
            else if(category === "jewelery")
            {
                itemGallery.innerHTML = "";
                apiKey = 'https://fakestoreapi.com/products/category/jewelery';
                fetchRequest(apiKey);
            }
            else if(category === "men's clothing")
            {
                itemGallery.innerHTML = "";
                apiKey = "https://fakestoreapi.com/products/category/men's clothing";
                fetchRequest(apiKey);
            }
            else if(category === "women's clothing")
            {
                itemGallery.innerHTML = "";
                apiKey = "https://fakestoreapi.com/products/category/women's clothing";
                fetchRequest(apiKey);
            }
            else if(category === "all products")
            {
                itemGallery.innerHTML = "";
                apiKey = 'https://fakestoreapi.com/products';
                fetchRequest(apiKey);
            }
        });
    };
};

renderCategory();

// ===================================================
//    sort by price
// ===================================================
const sortByPrice = (currentDataArray) => 
{
    selectedOption.addEventListener('change', () =>
    {
        searchBarInput.value = "";
        if(selectedOption.value == "priceAsc")
        {
            itemGallery.innerHTML = "";
            currentDataArray.sort((item1, item2) => item1.price - item2.price)
            renderItems(currentDataArray);
        }
        else if (selectedOption.value == "priceDesc")
        {
            itemGallery.innerHTML = "";
            currentDataArray.sort((item1, item2) => item2.price - item1.price)
            renderItems(currentDataArray);
        }
    });
};

// ======================
//      render items
// ======================
const renderItems = (productData) =>
{
    productData.forEach(singleItem => 
    {
        const figureElt = document.createElement('figure');
        const imgDescDiv = document.createElement('div');
        const itemImg = document.createElement('img');
        const itemDesc = document.createElement('figcaption');
        const priceCardDiv = document.createElement('div');
        const priceOutput = document.createElement('p');
        const buttonCard = document.createElement('button');
        buttonCard.textContent = "Add to card";

        itemGallery.append(figureElt);
        itemImg.setAttribute('src', singleItem.image);
        itemImg.setAttribute('alt', singleItem.description);
        priceOutput.textContent = singleItem.price + "€"
        itemDesc.textContent = singleItem.title;
        figureElt.append(imgDescDiv, priceCardDiv);
        imgDescDiv.append(itemImg, itemDesc);
        priceCardDiv.append(priceOutput, buttonCard);
    });
};
