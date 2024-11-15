var site_name = document.getElementById("sitename");
var site_url = document.getElementById("siteurl");
var tableBody = document.getElementById("tableContent");
var sitenameregex= /^[A-Z][a-z]{1,9}$/gm;
var urlregex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

var sitescontainer = [];
if (localStorage.getItem("products")!=null) {
  sitescontainer = JSON.parse(localStorage.getItem("products"));
  displayurl();
}

displayurl();

function addurl() {
if(sitenameregex.test(site_name.value) && urlregex.test(site_url.value))
{
  var site = {
    name: site_name.value,
    url: site_url.value,
  };
  sitescontainer.push(site);
  localStorage.setItem("products", JSON.stringify(sitescontainer));
  displayurl();
  clear();
}else
{alert("enter valid site name and valid url name (the name must start with captial letter and url [https://www.xxxxx.com])");
  clear()
}
}

function displayurl() {
  var cart = "";
  for (var i = 0; i < sitescontainer.length; i++) {
    cart += `<tr>
                  <td>${i + 1}</td>
            <td>${sitescontainer[i].name}</td>              
            <td>
              <button class="btn btn-success"   onclick="visititem(${i})">
                <i class="fa-solid fa-eye pe-2"></i>Visit
              </button>
            </td>
            <td>
              <button  onclick="delete_(${i})" class="btn btn-danger pe-2">
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </button>
            </td>
            </tr>
      `;
  }

  tableBody.innerHTML = cart;
}

function clear() {
  site_name.value = "";
  site_url.value = "";
}

function delete_(urlindex) {
  sitescontainer.splice(urlindex, 1);
  localStorage.setItem("products",JSON.stringify(sitescontainer));
  displayurl();
}

function visititem(index) {
  window.open(sitescontainer[index].url);
}
