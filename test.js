let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';
let tmp;


//get total
function getTotal(){
    if(price.value !=''){
        let result= (+price.value + +taxes.value + +ads.value)
        - +discount.value
          total.innerHTML = result ;
          total.style.background='#040';
    }
    else{
        total.style.background='#a00d02';
        total.innerHTML = '' ;
    }
}


// creat product
let dataPro ;
    if(localStorage.product !=null){
        dataPro=JSON.parse(localStorage.product); //بترجع الاراي لاصله (يعني بتحول الاسترنج ل اراي زي ما كان)
    }
    else {
        dataPro=[];
    }


submit.onclick = function(){
    
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
        
    }
    if (title.value!='' && price.value!='' && category.value!='' && newPro.count<=100) { //شروط اضافة منتج
        if(mood === 'create')
        { 
            if(newPro.count >1)
                {
                        for(let i=0 ;i<newPro.count;i++){
                            dataPro.push( newPro);
                        }
                }
            
            else
                {
                dataPro.push( newPro)
                }
        }
        else
        {
             dataPro[tmp] = newPro;
             mood = 'create';
             submit.innerHTML= 'Create'
             count.style.display='block';
    
        }  
        clearData();
    }
    

    localStorage.setItem('product', JSON.stringify(dataPro) )//بتحول الاراي لاسترنج

   
   showData() ;
}



// clear the data
function clearData(){
    title.value='';
    price.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    taxes.value='';
    count.value='';
    category.value='';
}


// read the data
function showData(){
    getTotal(); // عشان ارجع الزرار باللون الاحمر تاني عشان يتصفر يعني
    let table='';
    for(let i=0; i< dataPro.length;i++){
 // لا انا باضيف عنصر جوا كل صف ليه من الجدول htmlهنا انا مش باضيف عناصر جوا ال      
        table+= `<tr> 
                     <td>${i+1}</td>
                     <td>${dataPro[i].title}</td>
                     <td>${dataPro[i].price}</td>
                     <td>${dataPro[i].taxes}</td>
                     <td>${dataPro[i].ads}</td>
                     <td>${dataPro[i].discount}</td>
                     <td>${dataPro[i].total}</td>
                     <td>${dataPro[i].category}</td>
                     <td><button onclick=" updateProduct(${i})" id="update">update</button></td>
                     <td><button onclick=" deleteProduct(${i})" id="delete">delete</button></td>
             </tr>`

    }
    document.getElementById('tbody').innerHTML = table;
    // زرار مسح الكل
    let btnDelAll=document.getElementById('deleteAll');
    if(dataPro.length>0){ //بتاكد هل فيه بيانات ولا لا لان الزرار بيظهر فقط لو فيه بيانات
        btnDelAll.innerHTML=`
        <button onclick="deleteAll()">Delete All ( ${dataPro.length} ) </button>
        `

    }
    else{
        btnDelAll.innerHTML='';
    }
}
showData(); //لازم البيانات تتعرض تلقائي من غير ماعمل ريلود




// delete one product 
function deleteProduct(i){
dataPro.splice(i,1);//iبيمسح عنصر 1 كل لفة 
localStorage.product = JSON.stringify(dataPro); // الاراي مربوط باللوكل استورتج
// لازم لما امسح من الاراي اضيف الاراي الجديدة بعد المسح

showData();//عشان كل مايمسح يظهر البيانات 
}



// delete all products
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


// update data
 function updateProduct(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal();
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML='Update';
    mood='update';
    tmp=i;
 }


 //serch 
 let searchMood='title';
 function getSearchMood(id){
    let search = document.getElementById('search')
   if(id == 'searchTitle'){
    searchMood='title';
   }
   else{
    searchMood='category';
   }
   search.placeholder='Search By '+ searchMood;
   search.focus();
   search.value='';
   showData();
 }

 function searchData(value){//هباصي القيمة اللي هاخدها من اليوزر في مربع البحث
    let table = '';
    for(let i=0 ; i<dataPro.length;i++){
        if(searchMood == 'title'){
                if (dataPro[i].title.includes(value.toLowerCase())) {
                    table+= `<tr> 
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick=" updateProduct(${i})" id="update">update</button></td>
                        <td><button onclick=" deleteProduct(${i})" id="delete">delete</button></td>
                </tr>`

                }
        }
         else{     
                    if (dataPro[i].category.includes(value.toLowerCase())) {
                        table+= `<tr> 
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick=" updateProduct(${i})" id="update">update</button></td>
                            <td><button onclick=" deleteProduct(${i})" id="delete">delete</button></td>
                    </tr>`

                    }
        }
        document.getElementById('tbody').innerHTML = table;
    }


}