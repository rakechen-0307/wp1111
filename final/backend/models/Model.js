import mongoose from 'mongoose'

const schema = mongoose.Schema

const UserSchema = new schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    password: { type: String, required: [true, 'Password field is required.'] },
    works: [{ id: { type: String, required: [true, 'ID field is required.']},
            name: { type: String, required: [true, 'Name field is required.']},
            composer: { type: String, required: [true, 'Composer field is required.']},
        }]
});

const UserModel = mongoose.model('User', UserSchema);

const WorkSchema = new schema({
    id: { type: String, required: [true, 'ID field is required.'] },
    name: { type: String, required: [true, 'Name field is required.'] },
    composer: { type: String, required: [true, 'Composer field is required.'] },
    data: [{pitch:{ type: String, required: [true, 'Note pitch is required.'] },
            beat:{ type: String, required: [true, 'Note beat is required.'] },
            duration:{ type: Number, required: [true, 'Note duration is required.'] },
            section:{ type: Number, required: [true, 'Note section is required.'] }
    }],
});

const WorkModel = mongoose.model('Work', WorkSchema);

export { UserModel, WorkModel }