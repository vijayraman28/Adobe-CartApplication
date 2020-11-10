class Item {
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

class UI {
    static displayItems() {
        fetch('displayList.json').then(function (response) {
            return response.json();
        }).then((json) => {
            json.forEach(element => {
                console.log('element', element);
                UI.addItemToList(element)
            });
            console.log('json', json);
            return json
            // items = json;
        }).catch(function (err) {
            items = []
        });

        // console.log('displayitems', items);

        //  items.forEach((item) => UI.addItemToList(item));
    }

    static addItemToList(item) {
        console.log('name', item);
        const list = document.querySelector('.left-col');

        const itemBlock = document.createElement('div');
        itemBlock.classList.add('col-4');
        console.log('itemBlock', itemBlock);
        //     row.innerHTML = `
        //   <td>${list.name}</td>
        //   <td>${list.quantity}</td>
        //   <td>${book.isbn}</td>
        //   <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        // `;

        itemBlock.innerHTML = `
            <div class="card">
            <div class="card-inner-section">
                <div class="offer">
                    <p class="offer-details">10% Off</p>
                </div>
                <div class="card-inner">
                    <figure>
                        <img src="images/placeholder.jpg" alt="book-cover" class="img-responsive" />
                    </figure>
                </div>
                </div>
                <div class="card-footer">
                    <div class="book-name">${item.name}</div>
                    <div class="book-price">
                        <div class="price-wrapper">
                            <div class="net-price">${item.oldprice}</div>
                            <div class="offer-price">${item.newprice}</div>
                        </div>
                        <div class="add-cart">
                            <button type="button" class="add-cart-btn">Add to cart</button>
                        </div>
                    </div>

                </div>
        </div> `;

        list.appendChild(itemBlock);
        console.log('list', list);





    }
}

class Store {
    static getItems() {
        let items;
    }

    static addTocart(item, quantity, oldprice, newprice) {
        const cart = document.querySelector('#cart');
        console.log('cart', cart);
        const row = document.createElement('tr');
        row.classList.add('cartAdded')
        row.addEventListener('click', incrementCart);

        row.innerHTML = `<td>
            <div class = "item">
                <div class = "left-section" >
                <div class = "item-img" >
                <img src = "images/placeholder.jpg" alt = "item" class = "img-responsive" >
                </div> <div class = "item-name">${item}</div> </div> 
                <div class = "delete"> <button type = "button"
                class = "del-btn delete"> x </button> </div> </div>
          </td>
          <td>
            <div class = "qty">
                <div class = "minus" > <button type = "button" class = "minus-btn"> - </button></button >
                </div> <div class = "input-wrapper" >
                <input type = "text"  value=${quantity} class = "form-control"/>
                </div> <div class = "add"><button type = "button" class = "add-btn"> + </button> </div> </div>
          </td>
          <td> <div class = "oldprice">$${oldprice}</div></td>
          <span hidden> <div class = "newprice">$${newprice}</div></span>`;



        cart.appendChild(row);

        Store.updateTotal();

        // setTimeout(function () {

        //     const list = document.querySelector('.label-wrapper');

        //     const itemBlock = document.createElement('p');
        //     itemBlock.classList.add('label');

        //     itemBlock.innerHTML = `<span>${item} is added to cart</span>`;

        //     list.appendChild(itemBlock);


        // }, 500);







    }

    static removefromCart(ev) {
        if (ev.target.classList.contains('delete')) {
            ev.target.parentElement.parentElement.parentElement.parentElement.remove();
        }

        Store.updateTotal();
    }

    static incrementItem(ev) {

        let textValue = parseInt(ev.target.parentElement.previousElementSibling.childNodes[1].value)
        textValue += 1;
        ev.target.parentElement.previousElementSibling.childNodes[1].value = textValue.toString()

        Store.updateTotal()

    }

    static decrementItem(ev) {
        let textValue = parseInt(ev.target.parentElement.nextElementSibling.childNodes[1].value)
        textValue -= 1;
        ev.target.parentElement.nextElementSibling.childNodes[1].value = textValue.toString();
        Store.updateTotal();
    }

    static updateTotal() {
        const quantity = []
        const oldpricelist = []
        const newpricelist = []

        document.querySelectorAll('.form-control').forEach(element1 => {
            quantity.push(parseInt(element1.value));
        });

        const sumQuantities = quantity.reduce(function (x, y) {
            return x + y;
        });

        document.querySelectorAll('.oldprice').forEach(element2 => {
            oldpricelist.push(parseInt(element2.innerHTML.slice(1)));
        });

        document.querySelectorAll('.newprice').forEach(element2 => {
            newpricelist.push(parseInt(element2.innerHTML.slice(1)));
        })

        const mixarrayold = quantity.map(function (x, index) {
            return oldpricelist[index] * x
        }).reduce(function (x, y) {
            return x + y
        });

        const discountDiff = newpricelist.map(function (x, index) {
            return oldpricelist[index] - x
        })

        const discountTotal = quantity.map(function (x, index) {
            return discountDiff[index] * x
        }).reduce(function (x, y) {
            return x + y
        });





        document.querySelector('.oldprice-total').innerHTML = "$" + mixarrayold;
        document.querySelector('.itemtotalcount').innerHTML = `Items(${sumQuantities})`;
        document.querySelector('.discount-total').innerHTML = "$" + discountTotal;
        document.querySelector('.main-total').innerHTML = "$" + (mixarrayold - discountTotal);
        console.log('quantity', quantity);
        console.log('oldpricelist', oldpricelist);



    }
}

function appendData(data) {
    console.log('append-data', data);
}

document.addEventListener('DOMContentLoaded', UI.displayItems());

const item = new Item('Name', 'Quantity', 'Price');

// Add Book to UI
// UI.additemToList();

// Add book to store
// Store.addItem(item);

// Store.getItems();

document.querySelector('.left-col').addEventListener('click', (e) => {
    // Prevent actual submit
    e.preventDefault();
    console.log('etarget', e.target.parentNode.previousElementSibling.childNodes);
    const oldprice = e.target.parentNode.previousElementSibling.childNodes[1].innerText;
    const newprice = e.target.parentNode.previousElementSibling.childNodes[3].innerText;
    const item = e.target.parentNode.parentNode.previousElementSibling.childNodes[0].data;
    const quantity = 1;

    Store.addTocart(item, quantity, oldprice, newprice);

})


document.querySelector('tr').addEventListener('click', (e) => {


    console.log('e-target', e.target);

})


function incrementCart(ev) {
    console.log('ev', ev.target.className);
    const currentVal = ev.target.parentNode.parentNode.childNodes[3].childNodes[1].value;
    console.log('currentval', currentVal);

    switch (ev.target.className) {
        case 'del-btn delete':
            return Store.removefromCart(ev);
        case 'add-btn':
            return Store.incrementItem(ev);
        case 'minus-btn':
            return Store.decrementItem(ev);
    }
}