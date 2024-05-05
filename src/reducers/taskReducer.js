import actionTypes from '../constants/actionTypes';

const initialState = {
    tasks: [],
    recommendedTasks: [
    {
        title: "Morning Yoga Routine",
        description: "Start your day with a 30-minute morning yoga session at home to improve flexibility and strength. This will help increase your overall fitness levels and mental wellbeing."
    },
    {
        title: "Flashcard Review for Assembly Exam",
        description: "Spend 15 minutes each day quizzing yourself with flashcards on key concepts for your upcoming assembly exam. This will help reinforce your understanding and improve retention."
    },
    {
        title: "Research and Note-taking for History Class Essay",
        description: "Take some time to research and gather information for your history class essay topic. Begin outlining your essay structure and main points to ensure a well-organized and coherent piece."
    }]
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TASKS_FETCHED:
            return {
                ...state,
                tasks: action.tasks
            };
        case actionTypes.SET_RECOMMENDED_TASKS: 
            return {
                ...state,
                recommendedTasks: action.tasks 
            };
        default:
            return state;
    }
};

export default taskReducer;