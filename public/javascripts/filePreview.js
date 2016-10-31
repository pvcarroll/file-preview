class FilePreview extends React.Component {
  render() {
    return (
        <div>FILE PREVIEW</div>
    );
  }
}

class FileWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleImageError = this.handleImageError.bind(this);
    let imagePath;
    if (this.props.fileExt) {
      imagePath = "images/file_icons/" + this.props.fileExt + ".png";
    } else {
      imagePath = "images/file_icons/_blank.png";
    }
    this.state = {
      fileIcon: imagePath
    };
  }

  handleImageError() {
    this.onError = null;
    this.setState({fileIcon: "images/file_icons/_blank.png"});
  }

  filePreviewClicked() {
    ReactDOM.render(<FilePreview />, document.getElementById("filePreviewContainer"));
  }

  render() {
    let size = parseInt(this.props.file.size);
    if (size < 1000) {
      size = size + "B";
    } else if (size < 1000000) {
      size = (size / 1000).toFixed(2) + "KB";
    } else {
      size = (size / 1000000).toFixed(2) + "MB";
    }
    return (
        <div className="fileWidget" onClick={this.filePreviewClicked}>
          <img src={this.state.fileIcon} className="fileIcon" onError={this.handleImageError}/>
          <div className="textContainer">
            <div className="fileName">{this.props.fileName}</div>
            <div className="fileType">{this.props.file.type}</div>
            <div className="fileSize">{size}</div>
          </div>
          <div className="hoverPane">
            <img src="images/eye.png" className="hoverImage eyeImage"/>
            <img src="images/download.png" className="hoverImage downloadImage"/>
          </div>
        </div>
    );
  }
}

class FilePreviewWidgets extends React.Component {
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

ReactDOM.render(<FilePreviewWidgets />, document.getElementById("filePreviewWidgetsContainer"));