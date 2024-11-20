'use client'
const baseUrl = "http://localhost:5000";

const httpClient = {

    get: function(endpoint) {
        return fetch(baseUrl + endpoint, {
            credentials: 'include',
        })
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