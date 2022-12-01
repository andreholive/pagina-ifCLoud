import api from './api'

export default async (data) => {
    let res = { user_id: null, error: false, errorCode: "", projects:[], token:null};
      const auth = {
      auth:{identity:{methods: ["password"],   
      password:{user:{name: data.id,
                domain:{name: "Default"},
                password: data.pass}}}}
      };
      const header = {headers: {"Content-Type": "application/json"}};
      try{
        const response = await api.post('/identity/v3/auth/tokens', auth, header);
        localStorage.setItem("userId", response.data.token.user.id);
        localStorage.setItem("unScopedToken", response.headers["x-subject-token"]);
        return await getUserProjects(res);
      }
      catch(error) {
        if(error.request.status === 404 || error.request.status === 401 || error.request.status === 422){
          console.log("ERRO")
        }    
      };
} 

const getUserProjects = async (data) => {
    const header = {headers:{"X-Auth-Token": localStorage.getItem("unScopedToken")}};
    try{
      const response = await api.get(`identity/v3/users/${localStorage.getItem("userId")}/projects`, header)
      return response.data.projects[0].id;
    }catch(error){
        if(error.request.status === 404 || error.request.status === 401 ||  error.request.status === 422) {
          console.log("ERRO")
        }
      };
  };