'use client'
const baseUrl = "http://localhost:5000";

const httpClient = {

    get: function(endpoint) {
        return fetch(baseUrl + endpoint, {
            credentials: 'include',
        })
    },

    get_headers: function(endpoint, cookie) {
        return fetch(baseUrl + endpoint, {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${cookie}`,
                'Content-Type': 'application/json' // (opcional, dependendo do tipo de requisição)
            }
        });
    },

    post: function(endpoint, body) {
        return fetch(baseUrl + endpoint, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    },  

    postFormData: function(endpoint, body) {
        return fetch(baseUrl + endpoint, {
            method: "POST",
            credentials: 'include',
            body: body
        })
    },

    putFormData: function(endpoint, body) {
        return fetch(baseUrl + endpoint, {
            method: "PUT",
            credentials: 'include',
            body: body
        })
    },

    put: function() {
        return fetch(baseUrl + endpoint, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    },

    delete: function(endpoint) {
        return fetch(baseUrl + endpoint, {
            method: 'DELETE',
            credentials: 'include'
        })
    }
}

export default httpClient;