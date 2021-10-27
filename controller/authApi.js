/**
 * 4. middleware for confirming signin
 */

const requireSignin = expressJwt({

    secret: 'hufhsaduhughs!!@',
    algorithms: ['HS256'],
    userProperty: 'auth'
  
  })


    /**
 * 3. middleware to confirm authorization
 */
  
     const hasAuthorization = (req, res, next) => {
  
        const authorized = req.profile && req.auth && req.profile._id == req.auth._id
      
        if (!(authorized)) {
      
          return res.status('403').json({
      
            error: "User is not authorized"
      
          })
      
        }
      
        next()
      
      }
    

      export {
        requireSignin,
        hasAuthorization
      }