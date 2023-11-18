// ===============================================
//                JS_apis_fake_shop
// ===============================================

const itemGallery = document.body.querySelector('#itemGallery');
const selectedOption = document.body.querySelector('#selectedOption');
const searchBarInput = document.body.querySelector('#searchBarInput');
let shopDataArray = [];
let allProductsKey = 'https://fakestoreapi.com/products';

// =======================================
//   fetch request ––> get all products
// =======================================
const fetchRequest = (apiKey) =>
{
    fetch(apiKey)
        .then(res => res.json())
        .then(shopData => 
            {
                shopDataArray.push(...shopData);
                renderItems(shopData);
            });
}

fetchRequest(allProductsKey);

// ======================
//    search by input
// ======================
const searchInput = () =>
{
    const filteredData = shopDataArray.filter(item => 
    {
        if(item.title.toLowerCase().includes(searchBarInput.value.toLowerCase()))
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
        })
    }
}

renderCategory();

// ===================================================
//    sort by price ––> low to high ––> high to low
// ===================================================
const sortBySelect = () =>
{
    searchBarInput.value = "";
    if(selectedOption.value == "priceAsc")
    {
        itemGallery.innerHTML = "";
        shopDataArray.sort((item1, item2) => item1.price - item2.price)
        renderItems(shopDataArray);
    }
    else if (selectedOption.value == "priceDesc")
    {
        itemGallery.innerHTML = "";
        shopDataArray.sort((item1, item2) => item2.price - item1.price)
        renderItems(shopDataArray);
    }
};

// ======================
//      render items
// ======================
const renderItems = (productData) =>
{
    productData.forEach(singleItem => 
    {
        const figureElt = document.createElement('figure');
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
        figureElt.append(itemImg, itemDesc, priceCardDiv);
        priceCardDiv.append(priceOutput, buttonCard);
    });
};
