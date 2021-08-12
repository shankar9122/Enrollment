let baseUrl = "http://localhost:3000/"

export const getAPI = (type) => {
    return fetch(baseUrl + type, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    }).then((Response) => Response.json()).catch((err) => {
        throw err;
    });
}

export const postApi = (type, data) => {
    return fetch(baseUrl + type, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).catch(err => {
        throw err;
    })
}

export const putApi = (type, data) => {
    return fetch(baseUrl + type, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).catch(err => {
        throw err;
    })
}

export const deleteItem = (type) => {
    return fetch(baseUrl + type, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((Response) => Response.json()).catch((err) => {
        throw err;
    });
}




export const formatDate = date => {
    // const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) {
        day = `0${day}`;
    }

    if (month < 10) {
        month = `0${month}`;
    }

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
};