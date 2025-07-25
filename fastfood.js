
let cart = [];

function updateCartUI() {
  const cartItemsUl = document.getElementById("cartItems");
  const cartTotalSpan = document.getElementById("cartTotal");
  const cartCountSpan = document.getElementById("cartCount");
  cartItemsUl.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${item.name} <span style="font-weight:400;">x${item.qty}</span> - ₹${item.price * item.qty}
      <span class="remove-item" title="Remove" data-index="${idx}">&times;</span>
    `;
    cartItemsUl.appendChild(li);
    total += item.price * item.qty;
  });
  cartTotalSpan.textContent = total;
  cartCountSpan.textContent = cart.reduce((a, b) => a + b.qty, 0);

  [...document.getElementsByClassName("remove-item")].forEach(rmBtn =>
    rmBtn.onclick = function(){
      cart.splice(this.dataset.index, 1);
      updateCartUI();
    }
  );
}

[...document.querySelectorAll(".menu-item button")].forEach((btn) => {
  btn.onclick = function () {
   
    this.classList.add('add-to-cart-explode');
    this.addEventListener('animationend', () => {
      this.classList.remove('add-to-cart-explode');
    }, { once: true });

    
    const name = (this.closest(".menu-item")).dataset.name;
    const price = parseInt((this.closest(".menu-item")).dataset.price, 10);
    const idx = cart.findIndex(i => i.name === name);
    if(idx > -1) {
      cart[idx].qty += 1;
    } else {
      cart.push({name, price, qty: 1});
    }
    updateCartUI();
    document.getElementById('cartBtn').classList.add('highlight-cart');
    setTimeout(()=>{document.getElementById('cartBtn').classList.remove('highlight-cart');},200);
  };
});

document.getElementById("cartBtn").onclick = function () {
  document.getElementById("cartModal").style.display = "flex";
  updateCartUI();
};

document.getElementById("closeCart").onclick = function() {
  document.getElementById("cartModal").style.display = "none";
};

document.getElementById("clearCart").onclick = function() {
  cart = [];
  updateCartUI();
};

document.getElementById("checkoutBtn").onclick = function() {
  if(cart.length > 0) {
    alert("Thank you for your order!.Order Again.");
    cart = [];
    updateCartUI();
    document.getElementById("cartModal").style.display = "none";
  } else {
    alert("Your cart is empty.");
  }
};


document.getElementById("cartModal").onclick = function(event) {
  if(event.target.id === "cartModal") {
    document.getElementById("cartModal").style.display = "none";
  }
};

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function Particle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.radius = Math.random() * 3 + 1;
  this.color = ['#fc575e', '#f7b42c', '#ffdd00', '#F6D365'][Math.floor(Math.random()*4)];
  this.alpha = 0.2 + Math.random()*0.6;
  this.vx = -0.4 + Math.random()*0.8;
  this.vy = -0.2 + Math.random()*0.5;
}
Particle.prototype.draw = function(){
  ctx.globalAlpha = this.alpha;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.globalAlpha = 1.0;
};
Particle.prototype.update = function(){
  this.x += this.vx;
  this.y += this.vy;
  if(this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
  }
};

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
for(let i=0;i<120;i++) particles.push(new Particle());
animateParticles();

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const href = this.getAttribute("href");
    const target = document.querySelector(href);
    if(target) {
      window.scrollTo({top: target.offsetTop-70, behavior: 'smooth'});
    }
  });
});
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('email', email);
window.location.href = "fast_food_login.html";

window.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById('loginLink');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userEmail = localStorage.getItem('email');

  if (isLoggedIn === 'true') {
    loginLink.textContent = "Logout";
    loginLink.href = "#";
    loginLink.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('email');
      alert("Logged out successfully.");
      window.location.href = "fast_food_login.html";
    };
  }
});
