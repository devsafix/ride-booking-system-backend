import { JwtPayload } from "jsonwebtoken";


declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

// declare global {
//   namespace Express {
//     interface Request {
//       user: {
//         _id: string;
//         role: string;
//       };
//     }
//   }
// }
