export type createPostResult = {
    id: string;      
  title:  string;
  content:   string;
  authorId: string;   
}
export enum createPostError {
    BAD_REQUEST="BAD_REQUEST",
    USER_NOT_FOUND = "USER_NOT_FOUND",
}