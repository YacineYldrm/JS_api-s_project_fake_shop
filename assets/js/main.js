// ===============================================
//                JS_apis_fake_shop
// ===============================================

const itemGallery = document.body.querySelector('#itemGallery');
const selectedOption = document.body.querySelector('#selectedOption');
const searchBarInput = document.body.querySelector('#searchBarInput');
let shopDataArray = [];

// =======================================
//   fetch request ––> get all products
// =======================================

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(shopData => 
        {
            shopDataArray.push(...shopData);
            renderItems(shopData);
        });

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

const renderCategoryElec = () =>
{
    fetch('https://fakestoreapi.com/products/category/electronics')
        .then(res => res.json())
        .then(categoryElectronicData => 
            {
                itemGallery.innerHTML = "";
                renderItems(categoryElectronicData);
            })
};

const renderCategoryJew = () =>
{
    fetch('https://fakestoreapi.com/products/category/jewelery')
        .then(res => res.json())
        .then(categoryJewData => 
            {
                itemGallery.innerHTML = "";
                renderItems(categoryJewData);
            })
};

const renderCategoryMen = () =>
{
    fetch("https://fakestoreapi.com/products/category/men's clothing")
        .then(res => res.json())
        .then(categoryMenData => 
            {
                itemGallery.innerHTML = "";
                renderItems(categoryMenData);
            })
};

const renderCategoryWomen = () =>
{
    fetch("https://fakestoreapi.com/products/category/women's clothing")
        .then(res => res.json())
        .then(categoryWomenData => 
            {
                itemGallery.innerHTML = "";
                renderItems(categoryWomenData);
            })
};

// ===================================================
//    sort by price ––> low to high ––> high to low
// ===================================================

const sortBySelect = () =>
{
    fetch('https://fakestoreapi.com/products?sort=desc')
        .then(res=>res.json())
        .then(shopData => {
            
            if(selectedOption.value == "priceAsc")
            {
                itemGallery.innerHTML = "";
                shopData.sort((item1, item2) => item1.price - item2.price)
                renderItems(shopData);
            }
            else if (selectedOption.value == "priceDesc")
            {
                itemGallery.innerHTML = "";
                shopData.sort((item1, item2) => item2.price - item1.price)
                renderItems(shopData);
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
