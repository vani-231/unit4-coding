const mongoose = require('mongoose');

const jobSchema =  new mongoose.Schema({
        city:{type: 'string',required: true},
        skills:{type: 'string',required: true},
        location_type:{type: 'string',required: true},
        notice_period:{type: 'Number',required: true},
        no_of_jobs:{type: 'Number',required: true}
    }, {
        versionKey:false,
        timestamps:true
    }
);

module.exports = mongoose.model("user",jobSchema);