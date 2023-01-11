var itemData = [
    { category: 'fruit',  itemName: 'apple', onSale: false },
    { category: 'canned', itemName: 'beans', onSale: false },
    { category: 'canned', itemName: 'corn',  onSale: true  },
    { category: 'frozen', itemName: 'pizza', onSale: false },
    { category: 'fruit',  itemName: 'melon', onSale: true  },
    { category: 'canned', itemName: 'soup',  onSale: false },
  ];
  
  const obj = {};
  itemData.map((item, index) => {
    let objKeys = Object.keys(item);
    objKeys.forEach((k) => {
      if (k === "category") {
        if (!obj[item[k]]) {
          obj[item[k]] = [];
        }

        if (!obj[item[k]].find((i) => i === item.itemName)) {
          obj[item[k]].push(
            item.onSale ? `${item.itemName}($)` : item.itemName
          );
        }
      }
    });
  });
  console.log("obj", obj);