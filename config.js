const config = {
    local: {
        DB: {
            HOST: "127.0.0.1",
            PORT: "27017",
            DATABASE: "fourseasons",
            UserName: "",
            Password: ""
        },

        PORTNO: 8000,

    },

    staging: {
        DB: {
            HOST: "0.0.0.0",
            PORT: "27017",
            DATABASE: "FOURSEASON",
            MONGOOSE: {
                useUndifinedTopology: true,
                useNewUrlParser: true
            },
            UserName: "manishpatra254",
            Password: "y1ZgWWJIL5vbAjeS"
        },


        PORTNO: 8000,

    },
}
export const get = function get(env) {
    return config[env];
}