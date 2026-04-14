export const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3040";

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login : {
            url : '/api/user/login',
            method : 'post'
    },
    userDetails: {
            url : '/api/user/user-details',
            method : 'get'
    },
    forgot_password: {
        url : '/api/user/forgot_password',
        method : 'put'
    },
    forgot_password_otp_verification: {
        url : '/api/user/verify_forgot_password_otp',
        method : 'put'
    },
    resetPassword: {
        url : '/api/user/reset-password',
        method : 'put'
    },
    // send otp base login api
    sendLoginOtp: {
        url: '/api/user/send-login-otp',
        method: 'post'
    },
    verifyLoginOtp: {
        url: '/api/user/verify-login-otp',
        method: 'post'
    },

    // yahan sy whatsap ka kam start
    createConversation: {
        url : '/api/conversation/create-conversation',
        method : 'post'
    },
    getConversation:(userId)=>({                          // most important points backtik also use
        url : `/api/conversation/get-conversation/${userId}`,
        method : 'get'
    }),
    sendMessages: {
        url : '/api/message/send-message',
        method : 'post'
    },
    getMessages: (receiverId) => ({                       // most important points backtik also use
        url: `/api/message/get-message/${receiverId}`,
        method: "get"
    }),
    getAllUsers: {
        url: '/api/user/all-users',
        method: 'get'
    } ,
    // postStatus: {
    //     url : '/api/message/post-status',
    //     method : 'post'
    // },
    // getStatus: {
    //     url : '/api/message/get-status',
    //     method : 'get'
    // },
    getProfile: {
        url: "/api/profile/get-profile",
        method: "get",
  },

    updateProfile: {
        url: "/api/profile/update-profile",
        method: "put",
  },
  uploadImage: {
  url: "/api/user/upload-files",
  method: "post"
},

}


export default SummaryApi