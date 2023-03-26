//////////////////////////CONFIG//////////////////////////////
    const LIVEMAP_LINK = 'https://web.pulsepoint.org/';
//                  SONORAN CAD INFO                        //
    const API_KEY = '';                 
    const COMMUNITY_ID = '';                          
    const SERVER_ID = 1;                                    
//////////////////////////////////////////////////////////////

///DONT TOUCH THIS!!
function fetchEmergencyData() {
        const apiKey = API_KEY;
        const communityId = COMMUNITY_ID;
        const endpoint = 'https://api.sonorancad.com/emergency/get_calls';

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: communityId,
                key: apiKey,
                type: 'GET_CALLS',
                data: [
                    {
                        serverId: SERVER_ID,
                    }
                ]
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const activeCalls = data.activeCalls;
            displayEmergencyData(activeCalls);
        })
        
        .catch(error => {
            console.error('Error fetching emergency data:', error);
        });
}

function displayEmergencyData(emergencyData) {
    const emergencyList = document.getElementById('active-incidents-list');
    emergencyList.innerHTML = '';

    emergencyData.forEach((call, index) => {
        const listItem = document.createElement('li');
        if (call.address == "" )
            address = "Unkown"
        else
            address = call.address
        listItem.innerHTML = `<strong>Location:</strong> ${address}, <strong>Description:</strong> ${call.description}`;
        listItem.style.backgroundColor = index % 2 === 0 ? '#f2f2f2' : '#ffffff';
        emergencyList.appendChild(listItem);
    });
}

function initViewButtons() {
    const mapButton = document.getElementById('map-button');
    const incidentsButton = document.getElementById('incidents-button');
    const mapContainer = document.getElementById('map-container');
    const incidentsContainer = document.getElementById('incidents-container');
  
    // Get the selected button from localStorage, or default to 'map'
    const selectedButton = localStorage.getItem('selectedButton') || 'map';
  
    if (selectedButton === 'map') {
      mapButton.classList.add('active');
      incidentsButton.classList.remove('active');
      mapContainer.classList.remove('hidden');
      incidentsContainer.classList.add('hidden');
    } else if (selectedButton === 'incidents') {
      incidentsButton.classList.add('active');
      mapButton.classList.remove('active');
      incidentsContainer.classList.remove('hidden');
      mapContainer.classList.add('hidden');
    }
  
    mapButton.addEventListener('click', () => {
      localStorage.setItem('selectedButton', 'map');
      mapButton.classList.add('active');
      incidentsButton.classList.remove('active');
      mapContainer.classList.remove('hidden');
      incidentsContainer.classList.add('hidden');
    });
  
    incidentsButton.addEventListener('click', () => {
      localStorage.setItem('selectedButton', 'incidents');
      incidentsButton.classList.add('active');
      mapButton.classList.remove('active');
      incidentsContainer.classList.remove('hidden');
      mapContainer.classList.add('hidden');
    });
  }
  

document.getElementById("livemap_link").src = LIVEMAP_LINK;
fetchEmergencyData();
initViewButtons();
