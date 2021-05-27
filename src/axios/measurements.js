import axios from "axios";
import store from "@/store";

async function getMeasurements(parameters) {
    return new Promise((resolve) => {
        axios.get(`measurements/${parameters}`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                store.commit("setAlert", {
                    message: 'Get Measurement error!',
                    type: 'error',
                    show: true
                });
            })
    })
}


export {getMeasurements}