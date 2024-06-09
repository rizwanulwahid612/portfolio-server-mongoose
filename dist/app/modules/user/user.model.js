"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const ImgsSchema = new mongoose_1.Schema({
    imgs: {
        type: String,
    },
    public_id: {
        type: String,
    },
    secure_url: {
        type: String,
    },
});
const UserSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
        required: false,
    },
    youtube: {
        type: String,
        required: false,
    },
    instagram: {
        type: String,
        required: false,
    },
    tools: {
        type: String,
        required: false,
    },
    language: {
        type: String,
        required: false,
    },
    discord: {
        type: String,
        required: false,
    },
    skills: {
        type: String,
        required: false,
    },
    birth: {
        type: String,
        required: false,
    },
    marriedstatus: {
        type: String,
        required: false,
    },
    nid: {
        type: String,
        required: false,
    },
    ssc: {
        type: String,
        required: false,
    },
    hsc: {
        type: String,
        required: false,
    },
    masters: {
        type: String,
        required: false,
    },
    phd: {
        type: String,
        required: false,
    },
    passingyear: {
        type: String,
        required: false,
    },
    fathersname: {
        type: String,
        required: false,
    },
    mothersname: {
        type: String,
        required: false,
    },
    height: {
        type: String,
        required: false,
    },
    weight: {
        type: String,
        required: false,
    },
    experience1: {
        type: String,
        required: false,
    },
    experience2: {
        type: String,
        required: false,
    },
    experience3: {
        type: String,
        required: false,
    },
    experience4: {
        type: String,
        required: false,
    },
    experience5: {
        type: String,
        required: false,
    },
    experience6: {
        type: String,
        required: false,
    },
    experience7: {
        type: String,
        required: false,
    },
    experience8: {
        type: String,
        required: false,
    },
    experience9: {
        type: String,
        required: false,
    },
    experience10: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    imagess: [
        {
            type: ImgsSchema, // This is an array of subdocuments
        },
    ],
    // image: {
    //   type: String,
    //   required: true,
    // },
    aboutme: {
        type: String,
        required: true,
    },
    presentaddress: {
        type: String,
        required: true,
    },
    parmanentaddress: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    whatsapp: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    institute: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    frontend: {
        type: String,
        required: true,
    },
    backend: {
        type: String,
        required: true,
    },
    achivement: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
        required: true,
    },
    extracurriculam: {
        type: String,
        required: false,
    },
    blood: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    twitter: {
        type: String,
        required: false,
    },
    back: {
        type: String,
        required: false,
    },
    cv: {
        type: String,
        required: false,
    },
    features: {
        type: String,
        required: false,
    },
    framework: {
        type: String,
        required: false,
    },
    front: {
        type: String,
        required: false,
    },
    resume: {
        type: String,
        required: false,
    },
    technologyFor: {
        type: String,
        required: false,
    },
    tool: {
        type: String,
        required: false,
    },
    trainningcenter: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
UserSchema.statics.isUserExist = function (
//id: string,
email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email }, {
            id: 1,
            email: 1,
            password: 1,
            role: 1,
            needsPasswordChange: 1,
            image: 1,
            name: 1,
            aboutme: 1,
            presentaddress: 1,
            parmanentaddress: 1,
            achivement: 1,
            contact: 1,
            title: 1,
            institute: 1,
            degree: 1,
            frontend: 1,
            backend: 1,
            linkedin: 1,
            whatsapp: 1,
            github: 1,
            website: 1,
            birth: 1,
            blood: 1,
            experience1: 1,
            experience2: 1,
            experience3: 1,
            experience4: 1,
            experience5: 1,
            experience6: 1,
            experience7: 1,
            experience8: 1,
            experience9: 1,
            experience10: 1,
            extracurriculam: 1,
            fathersname: 1,
            gender: 1,
            height: 1,
            hsc: 1,
            marriedstatus: 1,
            masters: 1,
            mothersname: 1,
            nid: 1,
            passingyear: 1,
            phd: 1,
            skills: 1,
            ssc: 1,
            weigth: 1,
            language: 1,
            facebook: 1,
            instagram: 1,
            tools: 1,
            weight: 1,
            youtube: 1,
            discord: 1,
            twitter: 1,
            back: 1,
            cv: 1,
            features: 1,
            framework: 1,
            front: 1,
            resume: 1,
            technologyFor: 1,
            tool: 1,
            trainningcenter: 1,
        });
    });
};
UserSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
// User.create() / user.save()
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing user password
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bycrypt_salt_rounds));
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
