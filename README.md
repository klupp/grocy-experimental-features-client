# Grocy Experimental Features React Client
This is a react client for [Grocy Experimental Features](https://github.com/klupp/grocy-experimental-features?tab=readme-ov-file).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

_NOTE: The [Grocy Experimental Features](https://github.com/klupp/grocy-experimental-features?tab=readme-ov-file) and [Grocy](https://github.com/grocy/grocy) servers need to both be started to run this application._

# Features
The features developed here are purely of experimental nature. However, we intend to make them stable
for production use. They will be removed in case the main Grocy project implements them, but as it seems
some of them will never be in the scope of that project.

### Automatic collecting of offers
Works in Germany only for now.
Collects offers and maps them to your Grocy products so they are visible on your Grocy interface.
Offers store the following information:
- store
- price
- product
- image
- whether you need app or card for the price to apply
- amount offered
- brand of product
- description

![img.png](static/grocy_offers.png)
*Offers shown on your Grocy server.*

### Automatic Shopping List 
based on past consumption habits and current stock. It also collects offers to adjust your stock.
It tells you to buy more or earlier of some product if the current offer price is lower than your history of purchases.
Therefore saving you money. It will also find the cheapest store for given product and recommend to buy it there.

![grocy_experimental_features_shopping_list.png](static/grocy_experimental_features_shopping_list.png)*Grocy experimental view for shopping list management.*

![grocy_shopping_list.png](static/grocy_shopping_list.png)*Shopping List on Grocy server*

![grocy_android_shopping_list.png](static/grocy_android_shopping_list.png)*Shopping List on Android*

### Automatic Recipe Importer
similar to [Recipe Buddy](https://github.com/georgegebbett/recipe-buddy).

However, this one will prefill quantity units amounts and even products (if any found in you database) automatically, 
leaving just few checks here and there for you :). It does this by making a fuzzy search in your Grocy database and 
NLP processing to extract quantity data from string.

![recipe_form.png](static/recipe_form.png)*Recipe form.*

![crawled_recipe.png](static/crawled_recipe.png)*Automatically collected data without any user intervention.*

![grocy_recipe.png](static/grocy_recipe.png)*Imported Recipe in Grocy*

### Automatic importing of Store Receipts 
from some German stores: 
- Lidl
- Kaufland
- Netto (they just changed their api from JSON to SOAP, it loads only old receipts)
- REWE (Not Stable)
- DM (Not stable)

so far. 

The automatic prefilling of fields works here too. 

![receipt_form.png](static/receipt_form.png)*Receipt form. The data on the screen is completely automatically generated.*

### Automatic updating of existing products
data from OpenFoodFacts.