import Api from '@/services/api.js'

export default {
  state: {
    projects: [],
    project: {},
    projectId: null,
    projectPlans: []
  },
  getters: {
    getProjects(state) {
      return state.projects;
    },
    getProject(state) {
      return state.project;
    },
    getProjectId(state) {
      return state.projectId;
    },
    getProjectPlans(state) {
      return state.projectPlans
    }
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects
    },
    setProject(state, project) {
      state.project = project
    },
    setProjectId(state, data) {
      state.projectId = data.id
    },
    setProjectPlans(state, data) {
      state.projectPlans = data
    }
  },
  actions: {
    async fetchProjects({ commit }) {
      try {
        const res = await Api().get('/projects')
        commit('setProjects', res.data)
      } catch (e) {
        commit('error', e.response.data);
        throw e
      }
    },
    async fetchProject({ commit }, alias) {
      try {
        const res = await Api().get(`/project/${alias}`)
        commit('setProject', res.data)
      } catch (e) {
        commit('error', e.response.data);
        throw e
      }
    },
    async postComment({ commit }, payload) {
      try {
        const res = await Api().post(`/project/${payload.alias}/comments/add`, payload)
        commit('setProject', res.data)
      } catch (e) {
        commit('error', e.response.data);
        throw e
      }
    },
    async addProject({ commit }, project) {
      try {
        const res = await Api().post('/project/add', project, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        commit('setProjectId', res.data)
      } catch (e) {
        commit('error', e.response.data);
        throw e
      }
    },
    async createPlan({ commit }, payload) {
      try {
        await Api().post(`/project/plans/add`, payload)
      } catch (e) {
        commit('error', e.response.data);
        throw e
      }
    },
    async fetchProjectPlans({ commit }, alias) {
      try {
        const res = await Api().get(`/project/${alias}/plans`)
        commit('setProjectPlans', res.data)
      } catch (e) {
        commit('error', e.response.data);
        throw e
      }
    },
    async searchProjects({ commit }, text) {
      try {
        const res = await Api().get(`projects?search=${text}`)
        commit('setProjects', res.data)
      } catch (e) {
        commit('error', e.response.data)
        throw e
      }
    }
  }
}