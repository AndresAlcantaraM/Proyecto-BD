document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username && password) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboardContainer').style.display = 'flex';
    } else {
        alert('Por favor, ingrese el nombre de usuario y la contraseña.');
    }
});

function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function sendData(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
}

function addClient() {
    var client = {
        id: document.getElementById('client_id').value,
        name: document.getElementById('client_name').value,
        address: document.getElementById('client_address').value,
        city: document.getElementById('client_city').value,
        email: document.getElementById('client_email').value,
        phone: document.getElementById('client_phone').value
    };
    sendData('/addClient', client);
}

function addCourier() {
    var courier = {
        id: document.getElementById('courier_id').value,
        name: document.getElementById('courier_name').value,
        address: document.getElementById('courier_address').value,
        email: document.getElementById('courier_email').value,
        phone: document.getElementById('courier_phone').value,
        transport: document.getElementById('courier_transport').value
    };
    sendData('/addCourier', courier);
}

function addService() {
    var service = {
        code: document.getElementById('service_code').value,
        date: document.getElementById('service_date').value,
        time: document.getElementById('service_time').value,
        origin: document.getElementById('service_origin').value,
        destination: document.getElementById('service_destination').value,
        city: document.getElementById('service_city').value,
        description: document.getElementById('service_description').value,
        transport: document.getElementById('service_transport').value,
        packages: document.getElementById('service_packages').value
    };
    sendData('/addService', service);
}

function addUser() {
    var user = {
        login: document.getElementById('user_login').value,
        password: document.getElementById('user_password').value,
        address: document.getElementById('user_address').value,
        email: document.getElementById('user_email').value,
        phone: document.getElementById('user_phone').value
    };
    sendData('/addUser', user);
}




