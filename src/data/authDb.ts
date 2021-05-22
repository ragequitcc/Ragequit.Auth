import mongoose from 'mongoose';
import UserSchema from './models/userModel';
import config from '../util/config';

mongoose.connect('mongodb://localhost/auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    authSource: 'admin',
    user: config.db.user,
    pass: config.db.pass
});

const User = mongoose.model('User', UserSchema);

export {
    User
}
