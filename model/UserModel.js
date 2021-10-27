import mongoose from 'mongoose'
import crypto from 'crypto';

const { Schema } = mongoose;

const UserModel = new Schema(
    {
        firstname: { type: String , required:[true, 'Name is required |'] },
        lastname: { type: String , required:[true, 'Surname is required  |']  },
        email:{type: String, unique: [true, 'That email address is taken.'], required:[true, 'Email is required | '] },
        unit:{type: String, required:[true, 'Unit is required  |'] },
        hashed_password:{type:String , required:[true, 'Password is required | '] },
        updated:{type:Date, default:Date.now()},
        created:{type:Date, default:Date.now()},
        role:{type:String, default:"staff"},
        salt:{type:String},
        scorecardId:{type:String},
        HOD:{type:String},
        lineHead:{type:String},
        designation:{type:String}
    }
)

UserModel
  .virtual('password')
  .set(function(password) {
      
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })

  .get(function() {
    return this._password
  })



  UserModel.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserModel.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },

  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

export default mongoose.model('User', UserModel)