import { CropperImageInterface, UserInterFace } from "./myprofile";

/**
 * The Post Interface is for post at the work page
 * This is basically the innterface for all the posts
 */
export interface PostInterface {
  _id:string;
  author: UserInterFace;
  text: string;
  createdAt: Date;
  pinned: Boolean;
  priority: string;
  files: CropperImageInterface[];
  reactions: {
    user: UserInterFace;
    type: string;
  }[];
  comments:CommentInterface[];
  shares: {
    user: UserInterFace;
    createdAt: Date;
  }[];
  postAudience: string;
  reactionsEnabled: boolean;
  commentsEnabled: boolean;
  sharesDisabled: boolean;
}

export interface CommentInterface{
    author: UserInterFace;
    commentText: string;
    createdAt: Date;
    updatedAt: Date;
  files: CropperImageInterface[];
}