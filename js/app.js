const playerClickName = async () => {
  const getPlayer = document.getElementById('playerName').value;
  if(getPlayer){
    playerName = getPlayer;
  }
  else{
    playerName = 'messi';
  }
  document.getElementById('spinner').classList.remove('d-none');
  document.getElementById('addPlayerDetails').innerHTML = '';
  document.getElementById('showPlayerInfo').innerHTML = '';
  document.getElementById('playerName').value = '';
  const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`
  const res = await fetch(url);
  const data = await res.json();
  showDetails(data.player);
}

const showDetails = (playerDetails) => {
  document.getElementById('spinner').classList.add('d-none');
  if (playerDetails === null) {
    document.getElementById('addPlayerDetails').innerHTML = `
    <h1>No player found with this name</h1>
    `
    return;
  }

  // console.log(playerDetails);
  playerDetails.forEach(player => {
    // console.log(player);
    const { strPlayer, strThumb, strNationality, idPlayer } = player;
    const getPlayer = document.getElementById('addPlayerDetails');
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
                      <div class="card">
                        <img src="${strThumb ? strThumb : 'https://loremflickr.com/g/320/240/paris'}" class="h-50 card-img-top">
                        <div class="card-body h-50">
                          <h5 class="card-title">${strPlayer}</h5>
                          <h6 class="card-text">${strNationality}</h6>
                          <button onclick="detailsGreen('${idPlayer}')" type="button" class="btn btn-success">Details</button>
                        </div>
                      </div>
         `
    getPlayer.appendChild(div);
  });
}


const detailsGreen = async (id) => {
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
  const res = await fetch(url)
  const data = await res.json();
  showGreenDetails(data.players[0]);
  modalOpen(data.players[0]);
}

const showGreenDetails = (playerInfo) => {
  const getInfo = document.getElementById('showPlayerInfo');
  const { strPlayer, strThumb, strDescriptionEN } = playerInfo;

  const div = document.createElement('div');
  div.innerHTML = `
   <div class="card mb-3" style="max-width: 540px;">
   <div class="row g-0">
     <div class="col-md-4">
       <img src="${strThumb ? strThumb : 'https://loremflickr.com/g/320/240/paris'}" class="img-fluid rounded-start" alt="...">
     </div>
     <div class="col-md-8">
       <div class="card-body">
       <h5 class="card-title">${strPlayer}</h5>
       <p class="card-text">${strDescriptionEN ? strDescriptionEN.slice(0, 150) + `... <button onclick="detailsModal('${playerInfo.idPlayer}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">See More</button>` : "It is a joy to be hidden, and disaster not to be found"}</p>
       </div>
     </div>
   </div>
 </div>
   `
  getInfo.appendChild(div);
}

const detailsModal = async (id) => {
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
  const res = await fetch(url)
  const data = await res.json();
  modalOpen(data.players[0]);
}
const modalOpen = (idModal) => {
  console.log(idModal);
  const getModal = document.getElementById('showModal');
  document.getElementById('showModal').innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('modal-dialog');
  div.innerHTML = `
    <div class="modal-content">
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${idModal.strPlayer}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <p>${idModal.strDescriptionEN}</p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
    </div>
</div>    `
  getModal.appendChild(div);
}

playerClickName();