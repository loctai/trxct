const user = {
    state: {
        "testdata": 1,
        courses: [],
        user: {
            id: 12645,
        },
    },
    mutations: {
        CLEAR_COURSES(state) {
            state.courses = [];
        },
        ADD_COURSE(state, payload) {
        const newCourse = payload;
        state.courses.push(newCourse);
        // to change state: Vue.set(state-variable, 'key', 'value');
        },
    },
    actions: {
        addCourse(context, payload) {
            context.commit('ADD_COURSE', payload);
        },
    },
    getters: {
        getUser(state) {
            return state.user;
        },
    }
}
export default user