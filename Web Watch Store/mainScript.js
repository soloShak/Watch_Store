$(document).ready(function () {
    
    /**
     * This function is used for the main page to delete the name of the company.
     * when mouse will hover on the main background 
     */
    $("#main").hover(function () {
            // over
            $("#title").css({"visibility": "hidden" ,"opacity": "0" , "transition": "visibility 0s, opacity 0.5s ease-in-out"});
        }, function () {
            // out
            $("#title").css({ "visibility": "visible", "opacity": "1", "transition": "visibility 0s, opacity 0.5s ease-in-out"});
        }
    );
    

    /**
     * These 2 functions are used for the the history session of the main page.
     * All it does is that text will be appearing one by one while scrolling down
     * And it will be disappearing while scrolling up
     */
    var initPosition = window.pageYOffset;
    window.onscroll = function() {
        var currentPosition = window.pageYOffset;
        if (initPosition > currentPosition) 
            document.getElementById("header").style.top = "0";
        else 
            document.getElementById("header").style.top = "-80px";
        initPosition = currentPosition;
    }

    window.addEventListener("scroll", function(){ 
        var reveals = document.querySelectorAll(".reveal");
    
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
        
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    });
});

    /**
     * Following 2 functions are used for buttons in every watchPage
     * Clicking them the user can view different pictures of the watch
     */
    var imgNum = 1;
    function backImg(num){
        if (imgNum == 1)
            imgNum = 4;
        else
            imgNum--;

        let img = document.getElementById("image");
        img.style.backgroundImage = "url(./files/watch"+num+"_" + imgNum + ".avif)";
    }

    function forwardImg(num){
        if (imgNum == 4)
            imgNum = 1;
        else
            imgNum++;

        let img = document.getElementById("image");
        img.style.backgroundImage = "url(./files/watch"+num+"_" + imgNum + ".avif)";
    }

    /**
     * This function is used everytime we load the cart page.
     * It gets the "products" string variable from the localStorage, which is a string 
     * containing numbers of wathes user added to his cart
     * (For example if he added watch 1 and watch 2, the variable will be "12")
     * If that string variable is empty, it shows the noItem message
     * And to view all products I used for loop iterating over a set array 
     * driven from the string variable
    */
    window.onload = function gotoCart(){
        let strProds = localStorage.getItem("products");
        let productsArr = strProds.split('');

        // to take onlu unique product numbersS
        let products = [...new Set(productsArr)]

        if(!strProds)
            $(".noItem").removeClass("hidden");

        for (let i =  0; i < products.length; i++){
            $("#product"+products[i]).removeClass("hidden");
        }
    }

    /**
     * This function is used when the user clicks on X button, to remove a product from the cart.
     * It also gets string variable "products", searches for a character num inside of this string and deletes it.
     * Also if the "products" is an empty string, it also shows the noItem message
     */
    function removeProd(num){
        $("#product"+num).addClass("hidden");
        let strProds = localStorage.getItem("products");
        let newStrProds = strProds.replace(num, '');

        localStorage.setItem("products", newStrProds);

        if(!newStrProds)
            $(".noItem").removeClass("hidden");
    }

    /**
     * This function is used when the used click Add to Cart button inside each watchPage
     * It gets the "products" variable and adds the number of chosen watches to that string
     * In order to prevent multiple duplicate chars inside that String, I used the if statement,
     * which adds the number to a string only when is is unique
     */
    function addProd(num){
        products = localStorage.getItem("products");

        if(products.includes(num))
            $("#repeat"+num).removeClass("hidden");
        else{
            products += num;
            localStorage.setItem("products", products);
            $("#product"+num).removeClass("hidden");
            $("#added"+num).removeClass("hidden");
        }
        document.getElementById("cartBtn").disabled = true;
    }

    /**
     * Following these 2 functions are used to increase or decrease the quantity of the product
     * With each click the totalAmount will be increased or decreased by the correspoing price of the watches
     * Also when the quantity is zero, it disabled the minus button to prevent negative quantity.
     * The initial quantity is set to zero, so minus button is initially disabled
     */
    function minusProd(num){
        let total = document.getElementById("totalAmount");
        let quan = document.getElementById("quantity"+num);
        let price = document.getElementById("price"+num);
        quan.innerText = Number(quan.innerText) - 1;

        if (quan.innerText == 0)
            document.getElementById("minusQuan"+num).disabled = true;

        total.innerHTML = Number(total.innerHTML) - Number(price.innerText);

        if (total.innerHTML == NaN)
            total.innerHTML = 0; 
    }
    function plusProd(num){
        let total = document.getElementById("totalAmount");
        let quan = document.getElementById("quantity"+num);
        let price = document.getElementById("price"+num);
        document.getElementById("minusQuan"+num).disabled = false;

        quan.innerText = Number(quan.innerText) + 1;
        total.innerHTML = Number(total.innerHTML) + Number(price.innerText); 
    }