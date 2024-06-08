document.addEventListener("DOMContentLoaded", function() {

    const appId = 'RI1Za6hv7kRN84jaJT78T3nz2e880YnDLsrobLVZ';
    const apiKey = 'WsH1BJYEheydl73qLpqwLmvzDhUSnURwWSyaAamj';

    async function fetchData() {
        const config = {
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-JavaScript-Key': apiKey
            }
        };

        try {
            const response = await axios.get('https://parseapi.back4app.com/classes/Censoescolar', config);
            return response.data.results;
        } catch (error) {
            console.error('Erro ao buscar dados do Back4App:', error);
            return [];
        }
    }    
})
