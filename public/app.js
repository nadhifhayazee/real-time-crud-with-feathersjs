// const feathers = require('@feathersjs/feathers');
//const express = require('@feathersjs/express');
//const socketio = require('@feathersjs/socketio');
const socket = io();
const client = feathers();
client.configure(feathers.socketio(socket));


// socket.on('crud created', crud => 
//     console.log('mahasiswa dibuat', crud)
// );

const mhsHTML = `<main>

      
        <input type="text" name="nama" placeholder="Nama"> 
        <input type="text" name="jurusan" placeholder="Jurusan">
        <input type="text" name="nrp" placeholder="NRP">

        <button class="btn btn-success" id="buat" type="submit">BUAT</button>
        <button id="edt" data-info="null" style="display: none" class="btn-edit btn btn-warning">EDIT</button>
    
      
        

        <table class="table mhs-list">
        <th>Nama</th>
        <th>Jurusan</th>
        <th>Nrp</th>
        <th>Aksi</th>
        </table>

</main>`

const addMhs = crud => {
    const mhsList = document.querySelector('.mhs-list');

    if(mhsList) {
        mhsList.insertAdjacentHTML('beforeend', `
        <tr id="${crud._id}">
            <td>${crud.nama}</td>
            <td>${crud.jurusan}</td>
            <td>${crud.nrp}</td>
            <td id="hps">
                <button type="submit" class="btn-delete btn btn-danger">HAPUS</button>
            </td>
            <td id="ubh">
                <button type="submit" id="upd" class="btn-update btn btn-warning">UBAH</button>
            </td>
         
        </tr>
       
        
        
        `);    
    }
};



const showHTML = async () => {
    document.getElementById('app').innerHTML = mhsHTML;

    const allmhs = await client.service('crud').find();

    allmhs.data.forEach(addMhs);


};


//create
document.addEventListener('click', async ev => {
    if(ev.path[0].id === 'buat') {
        const inputNama = document.querySelector('[name="nama"]');
        const inputJurusan = document.querySelector('[name="jurusan"]');
        const inputNrp = document.querySelector('[name="nrp"]');

        ev.preventDefault();

        await client.service('crud').create({
            nama: inputNama.value,
            jurusan: inputJurusan.value,
            nrp: inputNrp.value
        });
    }
});


//submit edit
document.addEventListener('click', async ev => {
    if(ev.path[0].id === 'edt'){
        const inputNama = document.querySelector('[name="nama"]');
        const inputJurusan = document.querySelector('[name="jurusan"]');
        const inputNrp = document.querySelector('[name="nrp"]');

        ev.preventDefault();
        //console.log(ev.path[0].dataset.info);
        await client.service('crud').update(ev.path[0].dataset.info, {
            nama: inputNama.value,
            jurusan: inputJurusan.value,
            nrp: inputNrp.value
        });

    }
});

//edit request
document.addEventListener('click', async ev => {
    if(ev.path[0].parentElement.id === 'ubh'){
        const mhs = await client.service('crud')
            .get(ev.path[0].parentElement.parentElement.id);
            // .then(item => console.log(ev.path[0].parentElement.parentElement.id));
        //console.log(ev.path[0].parentElement.parentElement.id);

        //document.getElementsByClassName('btn-edit btn btn-warning');
        document.getElementById('edt').style.display = 'inline';
        const dit = document.getElementById('edt');
        dit.dataset.info = ev.path[0].parentElement.parentElement.id;
        console.log(dit.dataset.info);
        document.getElementById('buat').style.display = 'none';

        document.querySelector('[name="nama"]').value = mhs.nama;
        document.querySelector('[name="jurusan"]').value = mhs.jurusan;
        document.querySelector('[name="nrp"]').value = mhs.nrp;
  
    }

});



//remove
document.addEventListener('click', async ev => {
  
    if(ev.path[0].parentElement.id === 'hps'){
      
        await client.service('crud').remove(ev.path[0].parentElement.parentElement.id);
        console.log(ev.path[0].parentElement.parentElement.id);
    }

}); 

client.service('crud').on('created', addMhs);

client.service('crud').on('removed', showHTML);

client.service('crud').on('updated', showHTML);

showHTML();