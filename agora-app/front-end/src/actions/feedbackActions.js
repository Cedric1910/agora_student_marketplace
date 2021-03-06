import axios from 'axios';
import {
    FEEDBACK_POST_SUCCESS,
    FEEDBACK_POST_REQUEST,
    FEEDBACK_POST_FAIL
} from '../constants/feedbackConstants';

/*
 * FeedbackAction submitFeedback const. This method 
 * will send a dispatch to create a new feedback object based on details in the payload.
 * Params: feedback attributes
 */
const submitFeedback = (name, email, feedback) => async (dispatch) => {
    dispatch({
        type: FEEDBACK_POST_REQUEST, payload: { name, email, feedback }
    });
    try {
        const { data } = await axios.post("/api/feedback/send", {
            name, email, feedback
        });
        dispatch({ type: FEEDBACK_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FEEDBACK_POST_FAIL, payload: error.message });
    }
};

export {submitFeedback};