// const router = require('express').Router();
// const asyncHandler = require('express-async-handler');

// const { User } = require('../../db/models')
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js')

// router.get('/set-token-cookie',
//   asyncHandler(async (_req, res) => {
//     const user = await User.findOne({
//       where: {
//         username: 'Demo-User'
//       }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user })
//   })
// );

// router.get('/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user)
//   }
// );

// router.get('/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user)
//   }
// );
