import { CropperImageInterface, UserInterFace } from "./myprofile";

/**
 * The Post Interface is for post at the work page
 * This is basically the innterface for all the posts
 */
export interface PostInterface {
  id: string;
  author: UserInterFace;
  text: string;
  createdAt: string;
  pinned: Boolean;
  priority: string;
  files: CropperImageInterface[];
  reacts: {
    user: UserInterFace;
    type: string;
    id?: string;
  }[];
  comments: CommentInterface[];
  commentsLength: number;
  shares: {
    user: UserInterFace;
    createdAt: string;
  }[];
  postAudience: string;
  reactionsEnabled: boolean;
  commentsEnabled: boolean;
  sharesDisabled: boolean;
}

export interface CommentInterface {
  author: {
    id: string;
    firstname: string;
    lastname: string;
    professionalSummary: string;

    profilePic: {
      fileUrl: string;
    };
  };
  commentText: string;
  date: string;
  id: string;
  updatedAt: string;
  reactions: {
    user: {
      id: string;
      firstname: string;
      lastname: string;
      profilePic: {
        fileUrl: string;
      };
    };
    type: string;
    id?: string;
  }[];
  files: CropperImageInterface[];
  replies: CommentInterface[];
}
