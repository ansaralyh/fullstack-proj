import axios from 'axios'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/**Make API request */



/** Authneticate function */

 export async function authenticate(username)
 {
    try {
        return await axios.post('/api/authenticate' , {username})
    } catch (error) {
        return {error : "Username doesn't exist !"}
    }
 }
 /**Function to get the user */


 export async function getUser(username) {
    try {
        const { data } =await axios.get(`/api/user/${username}`);
        return { data };
       // Process the response here
    } catch (error) {
        return "Password doesn't match!";
    }
}

export async function registerUser(credentials)
{
    try {
        const {data : {msg} , status  } = await axios.post(`/appi/reisetr`,credentials)
        
        let { username, email }= credentials;
        /**send email */
        if(status === 201)
        {
            axios.post(`/api/registerMail`, {username, userEmail : email, text:msg})
        }
        return Promise.resolve(msg);
    } catch (error) {
        return Promise.reject({error})
    }
}

/**Login Function */

export async function verifyPassword({ username , password})
{
    try {
      if(username)
      {
        const { data } =  await axios.post('/api/login', {username , password});
        return Promise.resolve({ data });
      }
    } catch (error) {
        return Promise.reject({error:"Password does not matched !"})
    }
    
}


/** update user profile function */
export async function updateUser(response)
{
    try {

        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, {headers : {"Autherization" : `Bearer ${token}`}});
        return Promise.resolve({data})
        
    } catch (error) {
        return Promise.reject({ error : "Couldn't update profile"})
    }
}

/**Generate OTP */


export async function generateOTP(username)
{
    try {
        const { data: {code}, status } =  await axios.get('/api/generateOTP', { params : { username}}) ;
        //  send mail with OTP
        if (status === 201)
        {
          let {data : { email }} = await getUser({username})
          let text = `Your password recovery is ${code}. Verify and recover your password`;
          await axios.post('/api/registerMail',{username, userEmail:email,text,subbject:"Password recovery OTP"})

        }
        return Promise.resolve(code);

    } catch (error) {
        return Promise.reject({error})
    }
}

/**Verify OTP */
export async function verifyOTP({username, code})
{
    try {
      const { data, status} = await axios.get('/api/verifyOTP',{params:{username, code}})
        
    } catch (error) {
        return Promise.reject(error)
    }
}

/**Reset the passsword */

export async function resetPassword({ username , password})
{
    try {
        const {data, status} = await axios.put('/api/resetPassword', {username , password});
        return Promise.resolve({data , status});
    } catch (error) {
        return Promise.reject({ error})
    }
}