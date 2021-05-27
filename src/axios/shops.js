import axios from "axios";
import store from "@/store";

async function getShops() {
    return new Promise((resolve) => {
        axios.get(`shops/`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                store.commit("setAlert", {
                    message: 'Get Shops error!',
                    type: 'error',
                    show: true
                });
            })
    })
}


export {getShops}