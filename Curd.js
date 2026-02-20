let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let title = document.getElementById('title')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let tmp;
let mood = 'create'


//total operation
function gettotal(){
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = 'green'
    }
    else{
        total.innerHTML = ''
        total.style.background = '#ff8c00'
    }
}





//create

let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}
else{
    datapro = []
}

submit.onclick = function(){

    let newpro = {
        title: title.value.toLowerCase() ,
        price: price.value,
        taxes: taxes.value ,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    
    if(title.value != '' && category.value != '' && count.value< 101){
    if(mood === 'create'){
      if(newpro.count > 1){
        for(let i = 0; i < newpro.count; i++){
            datapro.push(newpro)
        } 
    }
    else{
         datapro.push(newpro)
    }  
    }else{
        datapro[tmp] = newpro
        mood = 'create'
        submit.innerHTML = 'Create'
        count.style.display = 'block'
    }
    clearpro()        
    }

    

    localStorage.setItem('product' , JSON.stringify(datapro))
    console.log(datapro)

    showpro()
    
}


//read
function showpro(){
    let table = ''
    for(let i = 0; i < datapro.length; i++)
    {
        table += `
    <tr>
                           
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick= "updatebtn(${i})" id="update">update</button></td>
        <td><button onclick= "deletebtn(${i})" id="delete">delete</button></td>
                            
    </tr>        
    `
    }

    document.getElementById('tbody').innerHTML = table;

    let deleteall = document.getElementById('deleteall')
    if(datapro.length > 0){
        deleteall.innerHTML = `
        <button onclick = "deleteall()">DELETE All(${datapro.length})</button>
        `
    }
    else{
        deleteall.innerHTML = ''
    }
}
showpro()



//clear
function clearpro(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}

//delete
function deletebtn(i){
    
    datapro.splice(i,1)
    localStorage = JSON.stringify(datapro)
    showpro()
}

function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    showpro()
}

//update
function updatebtn(i){
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    discount.value = datapro[i].discount
    category.value = datapro[i].category
    gettotal()
    mood = 'update';
    tmp = i
    submit.innerHTML = 'Update'
    count.style.display = 'none'
    scroll({
        top: 0,
        behavior: "smooth"
    })
}


//search
let searchmood = 'title'
function getsearch(id){
    let search = document.getElementById('search')
    if(id == 'searchTitle'){
        searchmood = 'title'
        search.placeholder = 'Search By Title'
    }else{
        searchmood = 'searchCategory'
        search.placeholder = 'Search By Catogry'
    }
    search.focus()
    search.value = ''
    showpro()
}

function searchdata(value){
    let table = ''
    if(searchmood == 'title'){
        for(let i = 0; i < datapro.length; i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `
        <tr>
                           
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
                <td><button onclick= "updatebtn(${i})" id="update">update</button></td>
            <td><button onclick= "deletebtn(${i})" id="delete">delete</button></td>
                            
        </tr>        
        `
        }
        }

    }else{
        for(let i = 0; i < datapro.length; i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table += `
        <tr>
                           
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick= "updatebtn(${i})" id="update">update</button></td>
            <td><button onclick= "deletebtn(${i})" id="delete">delete</button></td>
                            
        </tr>        
        `
        }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}