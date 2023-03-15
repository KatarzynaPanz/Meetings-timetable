class calendarProvider {
    constructor() {
        this.url='http://localhost:3005/meetings'
    }

    create(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        };
        return this._fetch(options);
    }

    _fetch(resource='', options={method: 'GET'}, id='') {
        const path = this.url + resource + `/${id}`;
        const promise = fetch(path, options);
        return promise
            .then(resp=> {
                if(resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            })
            .catch(err => console.error(err))
            .finally(() => {
                console.log('Odpytywanie API zakończone');
            })
    }
}

export default calendarProvider;