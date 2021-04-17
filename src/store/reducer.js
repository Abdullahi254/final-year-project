
const reducer = (state , action) => {
    switch (action.type) {
        case 'INITSTATE':
            console.log(action.consoles)
            state= {
                consoles:[...action.consoles]
            }
            return state
        case 'SETACTIVE':
            let consoleList = [...state.consoles]
            consoleList.splice(action.index, 1, {
                active: true
            })
            return {
                consoles: [...consoleList]
            }

        case 'SETIDLE':
            consoleList = [...state.consoles]
            consoleList.splice(action.index, 1, {
                active: false
            })
            return {
                consoles: [...consoleList]
            }
        default:
            return state
    }
}

export default reducer