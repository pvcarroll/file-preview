const FileUpload = require("react-fileupload");

var FilePreview = React.createClass({
  render: function() {
    // const option =
    return (
        <div>
          <FileUpload options="" >

          </FileUpload>
        </div>
    );
  }
});

ReactDOM.render(<FilePreview />, document.getElementById("filePreviewContainer"));