const cart = document.querySelector('.cart');
const cartInfo = document.querySelector('.cart-info');
const cartBtn = document.querySelectorAll('.store-item-icon');
const addItemsToCart = document.querySelector('.cart-total-container');

//Toggler Control
(function(){
    cartInfo.addEventListener('click', function(){
        cart.classList.toggle('show-cart');
    })
})();

//Cart Setup
(function(){
    cartBtn.forEach(function(e){
        e.addEventListener('click', function(event){
            if(event.target.parentElement.classList.contains('store-item-icon')){
                fullPath = event.target.parentElement.previousElementSibling.src;
                let pos = fullPath.indexOf('img') + 3;
                partialPath = fullPath.slice(pos) ;


               const item = [];
               item.img = `img-cart${partialPath}`;
               item.name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
               price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
               finalPrice = price.slice(1).trim();
               item.price = finalPrice;

               const cartItem = document.createElement('div');

               cartItem.classList.add(
                'cart-item',
                'd-flex', 
                'justify-content-between',
                'text-capitalize',
                'my-3'
               );

               cartItem.innerHTML = 
                `
                    <img src="${item.img}" id="item-img" class="img-fluid rounded-circle" alt="">
                    <div class="item-tex">
                        <p id="cart-item-title" class="font-weight-bold mb-0">
                            ${item.name}
                        </p>
                        <span>$</span>
                        <span id="cart-item-price" class="cart-item-price mb-0">${item.price}</span>
                    </div>
                    <a href="#" id="cart-item-remove" class="cart-item-remove">
                        <i class="fas fa-trash"></i>
                    </a>
                `

                //Inserting Items to Cart
                cart.insertBefore(cartItem, addItemsToCart);
                prompt('items added to cart');

                showTotals();
            }
        })
    })

    function showTotals(){
        const total = [];
        const items = document.querySelectorAll('.cart-item-price');

        items.forEach(function(item){
            total.push(parseFloat(item.textContent));
        })

        const totalMoney = total.reduce(function(total, item){
            total += item;
            return total;
        })
        
        const finalMoney = totalMoney.toFixed(2);
        console.log(finalMoney);

        document.getElementById('cart-total').textContent = finalMoney;
        document.querySelector('.item-total').textContent = finalMoney;
        document.getElementById('item-count').textContent = total.length;

    };

})();