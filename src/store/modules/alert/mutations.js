export default {
    setAlert(state, payload){
        state.message = payload.message;
        state.type = payload.type;
        state.show = payload.show;

        if (payload.show){
            setTimeout(() => {
                state.message = "";
                state.type = null;
                state.show = false;
            },3000);
        }
    }
}