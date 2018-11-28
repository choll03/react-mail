import { rootRef } from '../Firebase';


export const GET_LANGUAGE_STATUS = 'get_language_status';
export const GET_BIO = 'get_bio';
export const GET_PORTFOLIO_STATUS = 'get_portfolio_status';
export const GET_PORTFOLIO = 'get_portfolio';
export const GET_NILAI_STATUS = 'get_nilai_status';
export const GET_NILAI = 'get_nilai';

export function getLanguage(path, state) {
    return dispatch => {
        dispatch({
			type:GET_LANGUAGE_STATUS,
			payload:true
		});

        const databaseRef = rootRef.ref().child('language').child(path).child(state);
        databaseRef.on('value', snapshot => {
            let {about, button, bio, contact, detail_hobi, experience, education, edu, hobbi, name, opening, skill, we} = snapshot.val();
            dispatch({
                type: GET_BIO,
                payload: {about, button, bio, contact, detail_hobi, experience, education, edu, hobbi, name, opening, skill, we}
            })
            setTimeout(
                function() {
                    dispatch({
                        type:GET_LANGUAGE_STATUS,
                        payload:false
                    })
                },
                2000
            );
            
        })
        
    }
}

export function getPortfolio(path, state) {
    return dispatch => {
        dispatch({
            type: GET_PORTFOLIO_STATUS,
            payload: true,
        });

        const databaseRef = rootRef.ref().child('language').child(path).child(state);
        databaseRef.on('value', snapshot=> {
            dispatch({
                type: GET_PORTFOLIO,
                payload: snapshot.val()
            })
            setTimeout(
                function() {
                    dispatch({
                        type: GET_PORTFOLIO_STATUS,
                        payload:false
                    })
                },
                2000
            );
        })
    }
}

export function getNilai() {
    return dispatch => {
        dispatch({
            type: GET_NILAI_STATUS,
            payload:true
        })
        const databaseRef = rootRef.ref().child('nilai');
        databaseRef.on('value', snapshot=> {
            dispatch({
                type: GET_NILAI,
                payload: snapshot.val()
            })
            setTimeout(
                function() {
                    dispatch({
                        type: GET_NILAI_STATUS,
                        payload:false
                    })
                },
                2000
            );
        })
    }
}

