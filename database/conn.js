import mongoose from "mongoose";

 const connectMongoDB = async () => {


    try {
        
        const {connection} = await mongoose.connect(process.env.MONGODB_URL);

        switch(connection.readyState){
            case 0:
                console.log("Database connection lost");
                return Promise.resolve(true);
                break;
            case 1:
                console.log("Database connection succesful");
                return Promise.resolve(true);
                break;
            case 2:
                console.log("Database connection keep going");
                return Promise.resolve(true);
                break;
            case 3:
                console.log("Database connection drops");
                return Promise.resolve(true);
                break;
            case 99:
                console.log("Connection could not be started");
                return Promise.resolve(true);
                break;
            default:
                return "Pls check your database";
        }

    } catch (error) {
        
        return Promise.reject(error);

    }
}

export default connectMongoDB