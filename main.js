//get input field by its id
const form = document.querySelector('#myForm')
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const ul = document.querySelector('#users');


window.addEventListener('DOMContentLoaded', () => {
    //axios get
    axios
        .get('https://crudcrud.com/api/b7e900a13dff4dac9d9e236dc283bb30/appointmentAppData')
        .then((res) => {
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

    // // axios post
    axios
        .post('https://crudcrud.com/api/b7e900a13dff4dac9d9e236dc283bb30/appointmentAppData', obj)
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
    const editInput = document.createElement('input');
    editInput.type = 'button';
    editInput.name = 'edit';
    editInput.value = 'Edit';
    editInput.onclick = () => {
        console.log(user);
        //displaying the input values
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;

        //delete the li from ul
        ul.removeChild(li);
        
        let obj = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value
        };

        axios
            .put(`https://crudcrud.com/api/b7e900a13dff4dac9d9e236dc283bb30/appointmentAppData/${user._id}`, obj)
            .then((res) => {
                console.log('ok')
            })
            .catch((err) => {
                console.log(err);
            })
    };
       
    // create delete btn
    const deleteInput = document.createElement('input');
    deleteInput.type = 'button';
    deleteInput.name = 'delete';
    deleteInput.value = 'Delete';
    deleteInput.onclick = () => {
        axios
        .delete(`https://crudcrud.com/api/b7e900a13dff4dac9d9e236dc283bb30/appointmentAppData/${user._id}`)
        .then((res) => {
            ul.removeChild(li);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    //create text node to li
    li.appendChild(document.createTextNode(`${user.name} - ${user.email} - ${user.phone}`));

    //append that editBtn to li
    li.appendChild(editInput);
    //append that deleteBtn to li
    li.appendChild(deleteInput);
    //append that li to ul
    ul.appendChild(li);
}





