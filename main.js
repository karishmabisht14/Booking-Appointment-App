//get input field by its id
const form = document.querySelector('#myForm')
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');

//create ul
const ul = document.createElement('ul');

//event on submitBtn
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //create Object for local storage
    let obj = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };
    
    // axios post
    axios
        .post('https://crudcrud.com/api/17e448c1b2884d94bba8602640b9c3fd/appointmentData', obj)
        .then((res) => {
            form.insertAdjacentElement('afterend', ul);  
            console.log(res)
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong</h4>';
            console.log(err);
        });

    //create li for the ul
    const li = document.createElement('li');
    //create edit btn
    const editBtn = document.createElement('button');
    // create delete btn
    const deleteBtn = document.createElement('button');

    //create text node to li
    li.appendChild(document.createTextNode(obj.name + '-' + obj.email + '-' + obj.phone));
    //create tect node to edit btn
    editBtn.appendChild(document.createTextNode('Edit'));
    //create text node to delete button
    deleteBtn.appendChild(document.createTextNode("Delete"))

    //append that editBtn to li
    li.appendChild(editBtn);
    //append that deleteBtn to li
    li.appendChild(deleteBtn);
    //append that li to ul
    ul.appendChild(li);
    
    //insert it into html
    
    
    //edit button event
    editBtn.addEventListener('click', (e) => {
        
        //displaying the input values
        document.getElementById('name').value = obj.name;
        document.getElementById('email').value = obj.email;
        document.getElementById('phone').value = obj.phone;

        //delete the li from ul
        ul.removeChild(li);
        
        //delete data from local storage
        localStorage.removeItem(obj.email); 
    });

    //delete button event
    deleteBtn.addEventListener('click', (e) => {

        //delete the li from ul
        ul.removeChild(li);

        //delete data from local storage
        localStorage.removeItem(obj.email);

        //clear fields
        obj.name = '';
        obj.email = '';
        obj.phone = '';     
    });

    //clear fields
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = ''; 
});


