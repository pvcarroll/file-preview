class FileWidget extends React.Component {
  render() {
    let imagePath;
    if (this.props.fileExt) {
      imagePath = "images/file_icons/" + this.props.fileExt + ".png";
    } else {
      imagePath = "images/file_icons/_blank.png";
    }
    return (
        <div className="fileWidget">
          <img src={imagePath} className="fileIcon"/>
          <div className="textContainer">
            <div className="fileName">{this.props.fileName}</div>
            <div className="fileType">{this.props.file.type}</div>
            <div className="fileSize">{this.props.file.size}</div>
          </div>
        </div>
    );
  }
}

class FilePreview extends React.Component {
  constructor(props) {
    super(props);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.state = {
      files: []
    };
  }

  handleFileChange(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    let fullFileName = file.name;
    let extIndex = fullFileName.lastIndexOf(".");
    let fileName = (extIndex !== -1) ? fullFileName.substring(0, extIndex) : fullFileName;
    let fileExt = (extIndex !== -1) ? fullFileName.substring(extIndex + 1) : "";
    let thisReference = this;
    reader.onload = function() {
      let newFile = {
        file: file,
        filePreviewUrl: reader.result,
        fileName: fileName,
        fileExt: fileExt
      };
      thisReference.setState({
        files: thisReference.state.files.concat(newFile)
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    let files = this.state.files;
    return (
        <div>
          <input type="file" onChange={this.handleFileChange} />
          {
              files.map(function(file) {
                return <FileWidget key={file.fileName}
                                   file={file.file}
                                   filePreviewUrl={file.filePreviewUrl}
                                   fileName={file.fileName}
                                   fileExt={file.fileExt} />;
              })
          }
        </div>
    );
  }
}

ReactDOM.render(<FilePreview />, document.getElementById("filePreviewContainer"));