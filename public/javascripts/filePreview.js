class FilePreview extends React.Component{
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
    let thisReference = this;
    reader.onload = function() {
      let newFile = {
        file: file,
        filePreviewUrl: reader.result
      };
      thisReference.setState({
        files: newFile.filePreviewUrl
        // files: this.state.files.concat(newFile)
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    let filePreview = "";
    if (this.state) {
      filePreview = <img src={this.state.files} />;
    }
    return (
        <div>
          <input type="file" onChange={this.handleFileChange} />
          <div>{filePreview}</div>
        </div>
    );
  }
}

ReactDOM.render(<FilePreview />, document.getElementById("filePreviewContainer"));