import { Avatar } from "antd";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { LoadingOutlined, CameraFilled } from "@ant-design/icons";

const PostForm = ({
  content,
  setContent,
  postSubmit,
  handleImage,
  uploading,
  image,
}) => {
  return (
    <div className="card">
      <div className="card-body pb-3">
        <form className="form-group">
          <textarea
            // theme="snow"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            placeholder="Write something..."
          ></textarea>
        </form>
      </div>

      <div className="card-footer d-flex justify-content-end text-muted">
        <button
          disabled={!content}
          onClick={postSubmit}
          className="btn btn-primary btn-sm mt-1 px-5 mx-2"
        >
          Post
        </button>

        <label>
          {image && image.url ? (
            <Avatar size={30} src={image.url} className="mt-1" />
          ) : uploading ? (
            <LoadingOutlined className="mt-2 px-2" />
          ) : (
            <CameraFilled className="mt-2 px-2" style={{ fontSize: "150%" }} />
          )}
          <input onChange={handleImage} type="file" accept="images/*" hidden />
        </label>
      </div>
    </div>
  );
};

export default PostForm;
