import { CropperImageInterface, UserInterFace } from "./myprofile";

/**
 * The Post Interface is for post at the work page
 * This is basically the innterface for all the posts
 */
export interface PostInterface {
  id:string;
  author: UserInterFace;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  pinned: Boolean;
  priority: string;
  tags: string[];
  readBy: UserInterFace[];
  files: CropperImageInterface[];
  reactions: {
    user: UserInterFace;
    type: string;
  }[];
  comments: {
    user: UserInterFace;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    mentions: UserInterFace[];
  }[];
  shares: {
    user: UserInterFace;
    createdAt: Date;
  }[];
  postAudience: string;
  links: string[];
  reactionsEnabled: boolean;
  commentsEnabled: boolean;
  sharesDisabled: boolean;
}
