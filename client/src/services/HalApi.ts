/**
 * The hateoas client service simply follows a supplied link for generic CRUD operations
 */
export const HalApi = {
    get(url: string): Promise<Response> {
        return fetch(url, {
            method: 'GET',
        })
            .then(resp => resp.json());
    },
    post(url: string, data: object): Promise<Response> {
        const jsonData: string = JSON.stringify(data);

        return fetch(url, {
            method: 'POST',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
    },
    put(url: string): Promise<Response> {
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
    },
    delete(url: string): Promise<Response> {
        return fetch(url, {
            method: 'DELETE',
        }).then(resp => resp.json())
    },
};
