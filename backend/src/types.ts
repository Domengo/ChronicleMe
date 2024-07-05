import { User } from './models/userModel';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkb21lbmdvIiwiaWF0IjoxNzIwMjE2MzkzLCJleHAiOjE3MjAyMTk5OTN9.QQqSBWpPfFJAoKBrVRG-ZfR7k-2J2PYv0JUx5dL1irQ"
// }