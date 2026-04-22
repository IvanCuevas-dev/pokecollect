let BASE_URL = 'http://localhost:8000/api'

async function api(endpoint, method = 'GET', body = null) {
    let token = localStorage.getItem('token')

    let response = await fetch(BASE_URL + endpoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
        },
        body: body ? JSON.stringify(body) : null,
    })

    let data = await response.json()

    if (!response.ok) {
        throw { message: data?.message ?? 'Error desconocido' }
    }

    return data
}

export default api
