import {auth, projectFireStore} from '../firebase'


export const initState = ()=>{
    return dispatch=>{
        auth().onAuthStateChanged(currentUser => {
            projectFireStore.collection('consoles').doc(currentUser.uid).get().then(data=>{
                console.log(data.data().myConsoles)
                dispatch({
                    type:'INITSTATE',
                    consoles:data.data().myConsoles.map(c => c.active = false)
                })
            })
            .catch(er=>{
                console.log('unable to initSTate',er)
            })
        });
    }
}

