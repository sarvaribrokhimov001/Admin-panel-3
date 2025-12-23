"use strict";

Toastify({
    text: `Assalomu alaykum😊
    Admin panel ga xush kelibsiz !`,
    duration: 4000,
    gravity: "top",
    position: "center",
    close: true,
    style: {
      background: "linear-gradient(to right, black, black)",
      fontFamily: "Poppins, sans-serif",
      boxShadow: "0 0 12px rgba(0, 255, 0, 0.6)",
      width: "400px",
      borderRadius: "15px",
      color: "green"
    }
  }).showToast();


const logout = document.querySelector(".dashboard__logout");

const Logout = ()=> {
    localStorage.removeItem("token");
    window.location.href = "../pages/login.html";
};
logout.addEventListener('click' , Logout);


const signout = document.querySelector(".dashboard__signout");

signout.addEventListener("click" , ()=> {
    localStorage.removeItem("token");
    window.location.href = "../index.html";
});


const elMenu = document.querySelector(".dashboard__menu__icon");
const menuElements = document.querySelector(".dashboard__menu__elements");

let isOpen = false;

elMenu.addEventListener("click" , ()=> {
  if(!isOpen) {
    menuElements.innerHTML = `
      <div class="dashboard__menu__element">
        <div class="dashboard__menu__element__icon__and__text">
          <i class="ri-git-repository-line dashboard__menu__element__icon"></i>
          <p class="dashboard__menu__element__text"> Repository </p>
        </div> <!-- dashboard__menu__element__icon__and__text -->

        <div class="dashboard__menu__element__icon__and__text">
          <i class="ri-bar-chart-fill dashboard__menu__element__icon"></i>
          <p class="dashboard__menu__element__text"> Set status </p>
        </div> <!-- dashboard__menu__element__icon__and__text -->

        <div class="dashboard__menu__element__icon__and__text">
          <i class="ri-star-fill dashboard__menu__element__icon"></i>
          <p class="dashboard__menu__element__text"> Star </p>
        </div> <!-- dashboard__menu__element__icon__and__text -->

        <div class="dashboard__menu__element__icon__and__text">
          <i class="ri-settings-2-line dashboard__menu__element__icon"></i>
          <p class="dashboard__menu__element__text"> Settings  </p>
        </div> <!-- dashboard__menu__element__icon__and__text -->
      </div> <!-- dashboard__menu__element -->
    `;
    isOpen = true;
  } else {
    menuElements.innerHTML = "";
    isOpen = false;
  }
});


const API = 'https://fakestoreapi.com/products';
const tableBody = document.querySelector('.dashboard__table__body');

fetch(API).then(response => response.json()).then(data => {
  showData(data);
});

function showData(data) {

  data.map(({title , id , price , image , description , category} , index)=> {

    tableBody.innerHTML+= `
    
                <tr>
                  <td> ${id} </td>
                  <td> ${title} </td>
                  <td> ${category} </td>
                  <td> ${description} </td>
                  <td> ${price} </td>
                  <td> <img width="80" src=${image} alt=${title}> </td>
                  <td> 
                    <button class="dashboard__view__btn"> View </button>
                    <button class="dashboard__edit__btn"> Edit </button>
                    <button onclick="deleteProduct(${id})" class="dashboard__delete__btn"> Delete </button>
                  </td>
                </tr> 
    `
  });
  console.log(data);
}


const deleteProduct = (id)=> {

  fetch(`https://fakestoreapi.com/products/${id}` , {
    method: "DELETE",
  }).then(response => response.json()).then(data => {

    if(data) {
      Toastify({
          text: `Item successfully deleted`,
          duration: 4000,
          gravity: "top",
          position: "center",
          close: true,
          style: {
            background: "linear-gradient(to right, black, black)",
            fontFamily: "Poppins, sans-serif",
            boxShadow: "0 0 12px rgba(0, 255, 0, 0.6)",
            width: "400px",
            borderRadius: "15px",
            color: "green"
        }
      }).showToast();
    }
  });
}


const addProduct = document.querySelector('.add__Btn');
const elModal = document.querySelector('.modal__window');
const elForm = document.querySelector('.addForm');
const elCancel = document.querySelector('.cancel__btn');

addProduct.addEventListener("click" , ()=> {
  elModal.classList.toggle("hidden");
});


elCancel.addEventListener('click' , (e)=> {
  e.preventDefault();
  elModal.classList.toggle("hidden");
});


elForm.addEventListener('submit' , (e)=> {
  e.preventDefault();

  const elTitle = elForm['title'].value.trim();
  const elPrice = elForm['price'].value.trim();
  const elDescription = elForm['description'].value.trim();
  const elCategory = elForm['category'].value.trim();
  const elImage = elForm['image'].value.trim();

  const elProducts = {
    title,
    price,
    description,
    category,
    image
  };

  fetch(API , {
    method : "POST",
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify(elProducts),
  })
  .then((response) => response.json())
  .then((data) => {
       Toastify({
          text: `Item successfully added`,
          duration: 4000,
          gravity: "top",
          position: "center",
          close: true,
          style: {
            background: "linear-gradient(to right, black, black)",
            fontFamily: "Poppins, sans-serif",
            boxShadow: "0 0 12px rgba(0, 255, 0, 0.6)",
            width: "400px",
            borderRadius: "15px",
            color: "green"
        }
      }).showToast();
  });
});