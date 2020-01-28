class Api<T> {
    getApiEntries(): Promise<T> {
        return fetch("http://localhost:8090/api-entries", {
            method: 'GET',
        })
            .then(resp => resp.json())
            .catch(error => error);
    }
}

export default Api;