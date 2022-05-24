import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import { toast } from "react-toastify";
import Post from "../../components/cards/Post";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Modal } from "antd";
import CommentForm from "../../components/forms/CommentForm";

const PostComments = () => {
  const [post, setPost] = useState({});
  const router = useRouter();
  const _id = router.query._id;

  //comments
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeComment = async (postId, comment) => {
    // console.log(postId, comment);
    let answer = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!answer) return;
    try {
      const { data } = await axios.put("/remove-comment", {
        postId,
        comment,
      });
      // console.log("comment removed ", data);
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (_id) => {
    // console.log("liked this post ", _id);
    try {
      const { data } = await axios.put("/like-post", { _id });
      // console.log("liked ", data);
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (_id) => {
    // console.log("unliked this post ", _id);
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      // console.log("unliked ", data);
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = (post) => {
    setCurrentPost(post);
    setVisible(true);
  };

  const addComment = async (e) => {
    e.preventDefault();
    // console.log("add comment to this post id ", currentPost._id);
    // console.log("comment is ", comment);
    try {
      const { data } = await axios.put("add-comment", {
        postId: currentPost._id,
        comment,
      });
      // console.log("added comment, ", data);
      setComment("");
      setVisible(false);
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1 className="text-white">PepegaBook</h1>
        </div>
      </div>

      <div className="container col-md-8 offset-md-2 pt-5">
        <Post
          post={post}
          commentsCount={100}
          removeComment={removeComment}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          addComment={addComment}
          handleComment={handleComment}
        />
      </div>
      <Link href="/user/dashboard">
        <a className="d-flex justify-content-center p-5 h5">
          <RollbackOutlined />
        </a>
      </Link>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title="Add a comment"
        footer={null}
      >
        <CommentForm
          comment={comment}
          setComment={setComment}
          addComment={addComment}
        />
      </Modal>
    </div>
  );
};

export default PostComments;
