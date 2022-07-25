const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sName = document.getElementById('m-name')
const sBrand = document.getElementById('m-brand')
const sCategory = document.getElementById('m-category')
const sAmount = document.getElementById('m-amount')
const sPrice = document.getElementById('m-price')
const btnSave = document.getElementById('btnsave')

let itens
let id

function openModal (edit = false, index = 0){
    modal.classList.add('active')

    modal.onclick = e => {
        if(e.target.className.indexOf('modal-conteiner') !== -1){
            modal.classList.remove('active')
        }
    }

    if(edit){
        sName.value = itens[index].name
        sBrand.value = itens[index].brand
        sCategory.value = itens[index].category
        sAmount.value = itens[index].amount
        sPrice.value = itens[index].price
        id = index
    }
    else{
        sName.value = ''
        sBrand.value = ''
        sCategory.value = ''
        sAmount.value = ''
        sPrice.value = ''
    }
}

function editItem(index){
    openModal(true, index)
}

function deleteItem(index){
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index){
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.brand}</td>
    <td>${item.category}</td>
    <td>${item.amount}</td>
    <td>R$ ${item.price}</td>
    <td class="action">
    <button onclick="editItem(${index})"><i class='bx bx-edit-alt'></i></button>
  </td>
    <td class="action">
      <button onclick="deleteItem(${index})"><i class='bx bxs-trash-alt'></i></button>
    </td>
    `

    tbody.appendChild(tr)
}

btnSave.onclick = e => {
    if(sName.value == '' || sBrand.value == '' || sCategory.value == '' || sAmount.value == '' || sPrice.value == ''){
        return
    }

    e.preventDefault();

    if(id !== undefined){
        itens[id].name = sName.value
        itens[id].brand = sBrand.value
        itens[id].category = sCategory.value
        itens[id].amount = sAmount.value
        itens[id].price = sPrice.value
    }
    else{
        itens.push({'name': sName.value, 'brand': sBrand.value, 'category': sCategory.value, 'amount': sAmount.value, 'price': sPrice.value })
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}
function loadItens(){
    itens = getItensBD()
    tbody.innerHTML=''
    itens.forEach((item, index) =>{
        insertItem(item,index)
    })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()