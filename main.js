//get input field by its id
const form = document.querySelector('#myForm')
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const ul = document.querySelector('#users');


window.addEventListener('DOMContentLoaded', () => {
    //axios get
    axios
        .get('https://crudcrud.com/api/72a39688bfaf425ea380c94a8b205a07/appointmentAppData')
        .then((res) => {
            console.log('ok');

            for (let i = 0; i < res.data.length; i++) {
                showNewUser(res.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

//event on submitBtn
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //create Objects
    let obj = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };

    // axios post
    axios
        .post('https://crudcrud.com/api/72a39688bfaf425ea380c94a8b205a07/appointmentAppData', obj)
        .then((res) => {
            showNewUser(res.data);
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong</h4>';
            console.log(err);
        });
    //clear fields
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
});

//Function for adding new users
function showNewUser(user) {
    //create li for the ul
    const li = document.createElement('li');
    //create edit btn
    const editBtn = document.createElement('button');
    // create delete btn
    const deleteBtn = document.createElement('button');

    //create text node to li
    li.appendChild(document.createTextNode(`${user.name} - ${user.email} - ${user.phone}`));
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

    //edit button event
    editBtn.addEventListener('click', (e) => {

        //displaying the input values
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;

        //delete the li from ul
        ul.removeChild(li);
    });

    //delete button event
    deleteBtn.addEventListener('click', (e) => {

        //delete the li from ul
        ul.removeChild(li);

        //clear fields
        user.name = '';
        user.email = '';
        user.phone = '';
    });
}


