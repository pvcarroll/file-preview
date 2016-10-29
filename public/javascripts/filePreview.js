var FilePreview = React.createClass({
  handleFileChange: function(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    let thisReference = this;
    reader.onload = function() {
      thisReference.setState({
        file: file,
        filePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  },

  render: function() {
    let filePreview = "";
    if (this.state) {
      filePreview = this.state.filePreviewUrl;
    }
    return (
        <div>
          <input type="file" onChange={this.handleFileChange} />
          <div>{filePreview}</div>
        </div>
    );
  }
});

ReactDOM.render(<FilePreview />, document.getElementById("filePreviewContainer"));