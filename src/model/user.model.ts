import mongoose, {Schema,Document} from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
    isOpened:boolean;
}

const messageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    isOpened:{
        type: Boolean,
        required: true,
        default: false
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    isVerified:boolean;
    verifyCode:string;
    codeExpiry:Date;
    isAcceptingMessage:boolean;
    isSubscribed?: boolean;
    messages: Message[];
}

const userScema: Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        trim:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"email is invalid"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifyCode:{
        type:String,
    },
    codeExpiry:{
        type:Date,
        required:[true,"Code expiry is required"]
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    isSubscribed:{
        type:Boolean,
        default:true
    },
    messages:[messageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",userScema);

export default UserModel;